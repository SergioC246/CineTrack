import pool from './db'

async function migrate() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS movies (
      id SERIAL PRIMARY KEY,
      titulo VARCHAR(255) NOT NULL,
      año INTEGER NOT NULL,
      puntuacion INTEGER NOT NULL,
      reseña TEXT,
      estado VARCHAR(20) NOT NULL DEFAULT 'pendiente',
      created_at TIMESTAMP DEFAULT NOW()
    )
  `)
  console.log('✅ Tabla movies creada correctamente')
  process.exit(0)
}

migrate()