import { useState, useEffect } from 'react'
import type { Movie } from './types'
import MovieForm from './components/MovieForm'
import MovieList from './components/MovieList'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/movies'

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setMovies(data))
  }, [])

  async function handleAdd(movie: Movie) {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie)
    })
    const newMovie = await res.json()
    setMovies([newMovie, ...movies])
  }

  async function handleDelete(id: number) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    setMovies(movies.filter(movie => movie.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-8">🎬 CineTrack</h1>
        <MovieForm onAdd={handleAdd} />
        <MovieList movies={movies} onDelete={handleDelete} />
      </div>
    </div>
  )
}