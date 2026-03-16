import { Router } from 'express'
import type { Response } from 'express'
import pool from '../db'
import { authMiddleware } from '../middleware/auth'
import type { AuthRequest } from '../middleware/auth'

const router = Router()

router.use(authMiddleware)

// GET /api/movies
router.get('/', async (req: AuthRequest, res: Response) => {
  const result = await pool.query(
    'SELECT * FROM movies WHERE user_id = $1 ORDER BY created_at DESC',
    [req.userId]
  )
  res.json(result.rows)
})

// POST /api/movies
router.post('/', async (req: AuthRequest, res: Response) => {
  const { titulo, año, puntuacion, reseña, estado } = req.body
  const result = await pool.query(
    'INSERT INTO movies (titulo, año, puntuacion, reseña, estado, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [titulo, año, puntuacion, reseña, estado, req.userId]
  )
  res.json(result.rows[0])
})

// DELETE /api/movies/:id
router.delete('/:id', async (req: AuthRequest, res: Response) => {
  await pool.query(
    'DELETE FROM movies WHERE id = $1 AND user_id = $2',
    [req.params.id, req.userId]
  )
  res.json({ message: 'Película eliminada' })
})

export default router