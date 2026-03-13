import { useState } from 'react'
import type { Movie, EstadoMovie } from '../types'

interface MovieFormProps {
  onAdd: (movie: Movie) => void
}

export default function MovieForm({ onAdd }: MovieFormProps) {
  const [titulo, setTitulo] = useState('')
  const [año, setAño] = useState(2024)
  const [puntuacion, setPuntuacion] = useState(5)
  const [reseña, setReseña] = useState('')
  const [estado, setEstado] = useState<EstadoMovie>('pendiente')

  function handleSubmit() {
    const nuevaPelicula: Movie = {
      id: Date.now(),
      titulo,
      año,
      puntuacion,
      reseña,
      estado
    }
    onAdd(nuevaPelicula)
    setTitulo('')
    setReseña('')
  }

  return (
    <div className="bg-gray-900 rounded-2xl p-6 mb-8 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-gray-200">Añadir película</h2>

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
            placeholder="Ej: 2021"
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
            placeholder="Ej: 8"
            className="bg-gray-800 text-white rounded-lg px-4 py-2 outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-400">Tu reseña</label>
        <textarea
          value={reseña}
          onChange={e => setReseña(e.target.value)}
          placeholder="¿Qué te pareció? ¿La recomendarías?"
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

      <button
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2 transition-colors"
      >
        Añadir película
      </button>
    </div>
  )
}