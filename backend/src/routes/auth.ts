import { Router } from 'express'
import type { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from '../db'

const router = Router()
const JWT_SECRET = process.env.JWT_SECRET || 'secret_dev'

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response) => {
  const { email, password } = req.body
  const hashed = await bcrypt.hash(password, 10)
  try {
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
      [email, hashed]
    )
    const user = result.rows[0]
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET)
    res.json({ token, user })
  } catch {
    res.status(400).json({ error: 'El email ya está en uso' })
  }
})

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
  const user = result.rows[0]
  if (!user) return res.status(401).json({ error: 'Email o contraseña incorrectos' })
  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return res.status(401).json({ error: 'Email o contraseña incorrectos' })
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET)
  res.json({ token, user: { id: user.id, email: user.email } })
})

export default router