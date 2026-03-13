export interface Movie {
  id: number
  titulo: string
  año: number
  puntuacion: number
  reseña: string
  estado: EstadoMovie
  portada?: string
}

export type EstadoMovie = "vista" | "pendiente" | "descartada"