import { useState } from 'react'
import type { Movie, EstadoMovie } from '../types'

interface EditModalProps {
  movie: Movie
  onSave: (movie: Movie) => void
  onClose: () => void
}

export default function EditModal({ movie, onSave, onClose }: EditModalProps) {
  const [titulo, setTitulo] = useState(movie.titulo)
  const [año, setAño] = useState(movie.año)
  const [puntuacion, setPuntuacion] = useState(movie.puntuacion)
  const [reseña, setReseña] = useState(movie.reseña)
  const [descripcion, setDescripcion] = useState(movie.descripcion || '')
  const [estado, setEstado] = useState<EstadoMovie>(movie.estado)

  function handleSave() {
    onSave({ ...movie, titulo, año, puntuacion, reseña, descripcion, estado })
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center px-4 z-50">
      <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold text-white">Editar película</h2>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">Título</label>
          <input
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 outline-none"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col gap-1 w-1/2">
            <label className="text-sm text-gray-400">Año</label>
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
          <label className="text-sm text-gray-400">Descripción</label>
          <textarea
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
            rows={3}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 outline-none resize-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">Tu reseña</label>
          <textarea
            value={reseña}
            onChange={e => setReseña(e.target.value)}
            rows={3}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 outline-none resize-none"
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
            onClick={onClose}
            className="text-gray-400 text-sm hover:text-white transition-colors px-4 py-2"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-1.5 text-sm transition-colors"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  )
}