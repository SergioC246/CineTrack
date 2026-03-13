import type { Movie, EstadoMovie } from '../types'

interface MovieCardProps {
  movie: Movie
  onDelete: (id: number) => void
}

export default function MovieCard({ movie, onDelete }: MovieCardProps) {
  const colores: Record<EstadoMovie, string> = {
    vista: "bg-green-900 text-green-300",
    pendiente: "bg-yellow-900 text-yellow-300",
    descartada: "bg-red-900 text-red-300"
  }

  return (
    <div className="bg-gray-900 rounded-2xl p-5 flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-bold text-white">{movie.titulo}</h2>
        <span className={`text-xs px-3 py-1 rounded-full font-medium ${colores[movie.estado]}`}>
          {movie.estado}
        </span>
      </div>
      <p className="text-sm text-gray-400">{movie.año}</p>
      <p className="text-yellow-400 text-sm">{'★'.repeat(movie.puntuacion)}{'☆'.repeat(10 - movie.puntuacion)}</p>
      <p className="text-sm text-gray-300">{movie.reseña}</p>
      <button
        onClick={() => onDelete(movie.id)}
        className="mt-2 text-red-400 text-sm hover:text-red-300 transition-colors self-start"
      >
        Eliminar
      </button>
    </div>
  )
}