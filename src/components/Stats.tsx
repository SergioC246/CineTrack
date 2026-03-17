import type { Movie } from '../types'

interface StatsProps {
  movies: Movie[]
}

export default function Stats({ movies }: StatsProps) {
  const total = movies.length
  const vistas = movies.filter(m => m.estado === 'vista').length
  const pendientes = movies.filter(m => m.estado === 'pendiente').length
  const descartadas = movies.filter(m => m.estado === 'descartada').length
  const media = vistas > 0
    ? (movies.filter(m => m.estado === 'vista').reduce((acc, m) => acc + m.puntuacion, 0) / vistas).toFixed(1)
    : '—'

  if (total === 0) return null

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
      <div className="bg-gray-900 rounded-2xl p-4 text-center">
        <p className="text-3xl font-bold text-white">{total}</p>
        <p className="text-gray-400 text-sm mt-1">Total</p>
      </div>
      <div className="bg-gray-900 rounded-2xl p-4 text-center">
        <p className="text-3xl font-bold text-green-400">{vistas}</p>
        <p className="text-gray-400 text-sm mt-1">Vistas</p>
      </div>
      <div className="bg-gray-900 rounded-2xl p-4 text-center">
        <p className="text-3xl font-bold text-yellow-400">{pendientes}</p>
        <p className="text-gray-400 text-sm mt-1">Pendientes</p>
      </div>
      <div className="bg-gray-900 rounded-2xl p-4 text-center">
        <p className="text-3xl font-bold text-red-400">{descartadas}</p>
        <p className="text-gray-400 text-sm mt-1">Descartadas</p>
      </div>
      <div className="bg-gray-900 rounded-2xl p-4 text-center col-span-2 sm:col-span-4">
        <p className="text-3xl font-bold text-blue-400">{media}</p>
        <p className="text-gray-400 text-sm mt-1">Media de puntuación ⭐</p>
       </div>
    </div>
  )
}