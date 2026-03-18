import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import pool from '../db'

const JWT_SECRET = process.env.JWT_SECRET || 'secret_dev'

export interface AuthRequest extends Request {
  userId?: number
}

export async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'No autorizado' })

  // Intentamos primero con nuestro JWT
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number }
    req.userId = decoded.id
    return next()
  } catch {
    // Si falla, intentamos con Auth0
  }

  // Token de Auth0 — extraemos el sub y buscamos/creamos el usuario
  try {
    const decoded = jwt.decode(token) as { sub: string, email?: string } | null
    if (!decoded?.sub) return res.status(401).json({ error: 'Token inválido' })

    // Buscar usuario por auth0_sub
    let result = await pool.query('SELECT * FROM users WHERE auth0_sub = $1', [decoded.sub])

    if (result.rows.length === 0) {
      // Crear usuario nuevo
      result = await pool.query(
        'INSERT INTO users (email, password, auth0_sub) VALUES ($1, $2, $3) RETURNING *',
        [decoded.email || decoded.sub, 'auth0', decoded.sub]
      )
    }

    req.userId = result.rows[0].id
    return next()
  } catch {
    return res.status(401).json({ error: 'Token inválido' })
  }
}