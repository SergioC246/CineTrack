import { useState } from 'react'
import type { Movie } from './types'
import MovieForm from './components/MovieForm'
import MovieList from './components/MovieList'

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([])

  function handleAdd(movie: Movie) {
    setMovies([...movies, movie])
  }

  function handleDelete(id: number) {
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