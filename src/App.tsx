import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import type { Movie } from './types'
import MovieForm from './components/MovieForm'
import MovieList from './components/MovieList'
import AuthForm from './components/AuthForm'
import Stats from './components/Stats'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/movies'

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const { isAuthenticated, loginWithRedirect, logout, getAccessTokenSilently, user, isLoading } = useAuth0()

  useEffect(() => {
    async function fetchMovies(t: string) {
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${t}` }
      })
      const data = await res.json()
      setMovies(data)
    }

    if (isAuthenticated) {
      getAccessTokenSilently({
        authorizationParams: { audience: 'https://cinetrack-api' }
      }).then(t => {
        setToken(t)
        fetchMovies(t)
      })
    } else if (token) {
      fetchMovies(token)
    }
  }, [isAuthenticated, token, getAccessTokenSilently])

  async function getToken(): Promise<string> {
    if (isAuthenticated) {
      return await getAccessTokenSilently({
        authorizationParams: { audience: 'https://cinetrack-api' }
      })
    }
    return token || ''
  }

  async function handleAdd(movie: Movie) {
    const t = await getToken()
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${t}` },
      body: JSON.stringify(movie)
    })
    const newMovie = await res.json()
    setMovies([newMovie, ...movies])
  }

  async function handleDelete(id: number) {
    const t = await getToken()
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${t}` }
    })
    setMovies(movies.filter(movie => movie.id !== id))
  }

  async function handleEdit(movie: Movie) {
    const t = await getToken()
    const res = await fetch(`${API_URL}/${movie.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${t}` },
      body: JSON.stringify(movie)
    })
    const updatedMovie = await res.json()
    setMovies(movies.map(m => m.id === updatedMovie.id ? updatedMovie : m))
  }

  function handleLogout() {
    localStorage.removeItem('token')
    setToken(null)
    setMovies([])
    if (isAuthenticated) logout({ logoutParams: { returnTo: window.location.origin } })
  }

  if (isLoading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <p className="text-white text-lg">Cargando...</p>
    </div>
  )

  if (!token && !isAuthenticated) return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center gap-4 px-4">
      <div className="flex flex-col gap-4 items-center">
        <AuthForm onLogin={setToken} />
        <div className="flex items-center gap-3 w-64">
        <div className="flex-1 h-px bg-gray-700" />
        <span className="text-gray-400 text-sm">o</span>
        <div className="flex-1 h-px bg-gray-700" />
      </div>
        <button
          onClick={() => loginWithRedirect({
            authorizationParams: { audience: 'https://cinetrack-api' }
          })}
          className="bg-white text-gray-900 font-semibold rounded-lg px-6 py-2 flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
        >
          <img src="https://www.google.com/favicon.ico" className="w-4 h-4" />
          Continuar con Google
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">🎬 CineTrack</h1>
          <div className="flex items-center gap-3">
            {user && <p className="text-gray-400 text-sm">{user.email}</p>}
            <button
              onClick={handleLogout}
              className="text-gray-400 text-sm hover:text-white transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
        <Stats movies={movies} />
        <MovieForm onAdd={handleAdd} />
        <MovieList movies={movies} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
    </div>
  )
}