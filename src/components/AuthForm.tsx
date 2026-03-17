import { useState } from 'react'
import type { AuthResponse } from '../types'

interface AuthFormProps {
  onLogin: (token: string) => void
}

const API_URL = import.meta.env.VITE_API_URL?.replace('/movies', '') || 'http://localhost:3000/api'

export default function AuthForm({ onLogin }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

 interface ErrorResponse {
  error: string
}

async function handleSubmit() {
  setError('')
  const endpoint = isLogin ? '/auth/login' : '/auth/register'
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  const data = await res.json() as AuthResponse | ErrorResponse
  if (!res.ok) {
    setError((data as ErrorResponse).error || 'Algo salió mal')
    return
  }
  localStorage.setItem('token', (data as AuthResponse).token)
  onLogin((data as AuthResponse).token)
}

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-2">🎬 CineTrack</h1>
        <p className="text-gray-400 text-center mb-8">
          {isLogin ? 'Inicia sesión para ver tu lista' : 'Crea tu cuenta gratis'}
        </p>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">Email</label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@email.com"
              type="email"
              className="bg-gray-800 text-white rounded-lg px-4 py-2 outline-none placeholder-gray-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">Contraseña</label>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              type="password"
              className="bg-gray-800 text-white rounded-lg px-4 py-2 outline-none placeholder-gray-500"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2 transition-colors"
          >
            {isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
          </button>

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-gray-400 text-sm hover:text-white transition-colors"
          >
            {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </div>
      </div>
    </div>
  )
}