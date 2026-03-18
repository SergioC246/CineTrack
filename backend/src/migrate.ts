import pool from './db'

async function migrate() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `)

  await pool.query(`
    ALTER TABLE movies
    ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id)
  `)

  await pool.query(`
    ALTER TABLE movies
    ADD COLUMN IF NOT EXISTS portada TEXT
  `)

  await pool.query(`
  ALTER TABLE movies
  ADD COLUMN IF NOT EXISTS descripcion TEXT
  `)

  console.log('✅ Tablas actualizadas correctamente')
  process.exit(0)
}

migrate()