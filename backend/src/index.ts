import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import moviesRouter from './routes/movies'
import authRouter from './routes/auth'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/movies', moviesRouter)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CineTrack API running 🎬' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})