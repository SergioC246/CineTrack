import { useState } from 'react'

interface TMDBMovie {
  id: number
  title: string
  release_date: string
  overview: string
  poster_path: string | null
}

interface MovieSearchProps {
  onSelect: (movie: TMDBMovie) => void
}

const TMDB_KEY = import.meta.env.VITE_TMDB_KEY

export default function MovieSearch({ onSelect }: MovieSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<TMDBMovie[]>([])
  const [loading, setLoading] = useState(false)

  async function handleSearch() {
    if (!query.trim()) return
    setLoading(true)
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${encodeURIComponent(query)}&language=es-ES`
    )
    const data = await res.json()
    setResults(data.results.slice(0, 5))
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          placeholder="Busca una película..."
          className="bg-gray-800 text-white rounded-lg px-4 py-2 outline-none placeholder-gray-500 flex-1"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition-colors"
        >
          {loading ? '...' : 'Buscar'}
        </button>
      </div>

      {results.length > 0 && (
        <div className="flex flex-col gap-2">
          {results.map(movie => (
            <button
              key={movie.id}
              onClick={() => { onSelect(movie); setResults([]) }}
              className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 rounded-lg p-3 text-left transition-colors"
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  alt={movie.title}
                  className="w-10 h-14 object-cover rounded"
                />
              ) : (
                <div className="w-10 h-14 bg-gray-600 rounded flex items-center justify-center text-xs text-gray-400">
                  Sin imagen
                </div>
              )}
              <div>
                <p className="text-white font-medium">{movie.title}</p>
                <p className="text-gray-400 text-sm">{movie.release_date?.split('-')[0]}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}