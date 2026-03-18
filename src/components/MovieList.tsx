import type { Movie } from '../types'
import MovieCard from './MovieCard'

interface MovieListProps {
  movies: Movie[]
  onDelete: (id: number) => void
  onEdit: (movie: Movie) => void
}

export default function MovieList({ movies, onDelete, onEdit }: MovieListProps) {
  if (movies.length === 0) {
    return (
      <div className="text-center text-gray-500 py-16">
        <p className="text-4xl mb-4">🎬</p>
        <p className="text-lg">No hay películas todavía</p>
        <p className="text-sm">¡Añade una arriba!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  )
}