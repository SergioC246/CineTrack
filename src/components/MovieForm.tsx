import { useState } from 'react'
import type { Movie, EstadoMovie } from '../types'
import MovieSearch from './MovieSearch'

interface MovieFormProps {
  onAdd: (movie: Movie) => void
}

interface TMDBMovie {
  id: number
  title: string
  release_date: string
  overview: string
  poster_path: string | null
}

export default function MovieForm({ onAdd }: MovieFormProps) {
  const [titulo, setTitulo] = useState('')
  const [año, setAño] = useState(2024)
  const [puntuacion, setPuntuacion] = useState(5)
  const [reseña, setReseña] = useState('')
  const [estado, setEstado] = useState<EstadoMovie>('pendiente')
  const [portada, setPortada] = useState<string | undefined>(undefined)
  const [modo, setModo] = useState<'buscar' | 'manual'>('buscar')

  function handleSelect(movie: TMDBMovie) {
    setTitulo(movie.title)
    setAño(Number(movie.release_date?.split('-')[0]) || 2024)
    setReseña(movie.overview || '')
    setPortada(movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : undefined
    )
    setModo('manual')
  }

  function handleSubmit() {
  const nuevaPelicula: Movie = {
    id: 0,
    titulo,
    año,
    puntuacion,
    reseña,
    estado,
    portada: portada ?? undefined
  }
    onAdd(nuevaPelicula)
    setTitulo('')
    setReseña('')
    setPortada(undefined)
    setModo('buscar')
  }

  return (
    <div className="bg-gray-900 rounded-2xl p-6 mb-8 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-gray-200">Añadir película</h2>

      {modo === 'buscar' ? (
        <>
          <MovieSearch onSelect={handleSelect} />
          <button
            onClick={() => setModo('manual')}
            className="text-gray-400 text-sm hover:text-white transition-colors self-start"
          >
            ¿Prefieres añadirla manualmente?
          </button>
        </>
      ) : (
        <>
          {portada && (
            <img src={portada} alt={titulo} className="w-24 rounded-lg" />
          )}

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">Título</label>
            <input
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
              placeholder="Ej: Inception"
              className="bg-gray-800 text-white rounded-lg px-4 py-2 outline-none placeholder-gray-500"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-1 w-1/2">
              <label className="text-sm text-gray-400">Año de estreno</label>
              <input
                value={año}
                onChange={e => setAño(Number(e.target.value))}
                type="number"
                className="bg-gray-800 text-white rounded-lg px-4 py-2 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1 w-1/2">
              <label className="text-sm text-gray-400">Puntuación (1-10)</label>
              <input
                value={puntuacion}
                onChange={e => setPuntuacion(Number(e.target.value))}
                type="number"
                min={1}
                max={10}
                className="bg-gray-800 text-white rounded-lg px-4 py-2 outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">Tu reseña</label>
            <textarea
              value={reseña}
              onChange={e => setReseña(e.target.value)}
              placeholder="¿Qué te pareció?"
              rows={3}
              className="bg-gray-800 text-white rounded-lg px-4 py-2 outline-none placeholder-gray-500 resize-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">Estado</label>
            <select
              value={estado}
              onChange={e => setEstado(e.target.value as EstadoMovie)}
              className="bg-gray-800 text-white rounded-lg px-4 py-2 outline-none"
            >
              <option value="pendiente">🕐 Pendiente</option>
              <option value="vista">✅ Vista</option>
              <option value="descartada">❌ Descartada</option>
            </select>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-3 py-1.5 text-sm transition-colors"
            >
              Añadir película
            </button>
            <button
              onClick={() => setModo('buscar')}
              className="text-gray-400 text-sm hover:text-white transition-colors"
            >
              Volver a buscar
            </button>
          </div>
        </>
      )}
    </div>
  )
}