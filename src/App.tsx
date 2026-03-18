import { useState, useEffect } from 'react'
import type { Movie } from './types'
import MovieForm from './components/MovieForm'
import MovieList from './components/MovieList'
import AuthForm from './components/AuthForm'
import Stats from './components/Stats'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/movies'

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))

  useEffect(() => {
    if (!token) return
    fetch(API_URL, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setMovies(data))
  }, [token])

  async function handleAdd(movie: Movie) {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(movie)
    })
    const newMovie = await res.json()
    setMovies([newMovie, ...movies])
  }

  async function handleDelete(id: number) {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    setMovies(movies.filter(movie => movie.id !== id))
  }

  async function handleEdit(movie: Movie) {
  const res = await fetch(`${API_URL}/${movie.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(movie)
  })
  const updatedMovie = await res.json()
  setMovies(movies.map(m => m.id === updatedMovie.id ? updatedMovie : m))
}

  function handleLogout() {
    localStorage.removeItem('token')
    setToken(null)
    setMovies([])
  }

  if (!token) return <AuthForm onLogin={setToken} />

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">🎬 CineTrack</h1>
          <button
            onClick={handleLogout}
            className="text-gray-400 text-sm hover:text-white transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
        <Stats movies={movies} />
        <MovieForm onAdd={handleAdd} />
        <MovieList movies={movies} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
    </div>
  )
}