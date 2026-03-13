import { Router } from 'express'
import type { Request, Response } from 'express'
import pool from '../db'

const router = Router()

// GET /api/movies — obtener todas las películas
router.get('/', async (req: Request, res: Response) => {
  const result = await pool.query('SELECT * FROM movies ORDER BY created_at DESC')
  res.json(result.rows)
})

// POST /api/movies — añadir una película
router.post('/', async (req: Request, res: Response) => {
  const { titulo, año, puntuacion, reseña, estado } = req.body
  const result = await pool.query(
    'INSERT INTO movies (titulo, año, puntuacion, reseña, estado) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [titulo, año, puntuacion, reseña, estado]
  )
  res.json(result.rows[0])
})

// DELETE /api/movies/:id — eliminar una película
router.delete('/:id', async (req: Request, res: Response) => {
  await pool.query('DELETE FROM movies WHERE id = $1', [req.params.id])
  res.json({ message: 'Película eliminada' })
})

export default router