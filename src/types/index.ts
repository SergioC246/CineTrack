export interface Movie {
  id: number
  titulo: string
  año: number
  puntuacion: number
  reseña: string
  estado: EstadoMovie
  portada?: string
  descripcion?: string
}

export type EstadoMovie = "vista" | "pendiente" | "descartada"

export interface User {
  id: number
  email: string
}

export interface AuthResponse {
  token: string
  user: User
}