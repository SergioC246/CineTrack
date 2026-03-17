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
    <div className="bg-gray-900 rounded-2xl overflow-hidden flex flex-col">
      {movie.portada ? (
        <img
          src={movie.portada}
          alt={movie.titulo}
          className="w-full aspect-[2/3] object-cover"
        />
      ) : (
        <div className="w-full aspect-[2/3] bg-gray-800 flex items-center justify-center text-4xl">
          🎬
        </div>
      )}

      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex justify-between items-start gap-2">
          <h2 className="text-white font-bold text-sm leading-tight">{movie.titulo}</h2>
          <span className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 ${colores[movie.estado]}`}>
            {movie.estado}
          </span>
        </div>
        <p className="text-gray-400 text-xs">{movie.año}</p>
        <p className="text-yellow-400 text-xs">{'★'.repeat(movie.puntuacion)}{'☆'.repeat(10 - movie.puntuacion)}</p>
        <p className="text-gray-300 text-xs line-clamp-3">{movie.reseña}</p>
        <button
          onClick={() => onDelete(movie.id)}
          className="mt-auto text-red-400 text-xs hover:text-red-300 transition-colors self-start"
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}