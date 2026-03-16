import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secret_dev'

export interface AuthRequest extends Request {
  userId?: number
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'No autorizado' })
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number }
    req.userId = decoded.id
    next()
  } catch {
    res.status(401).json({ error: 'Token inválido' })
  }
}