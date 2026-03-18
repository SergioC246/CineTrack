import { auth } from 'express-oauth2-jwt-bearer'

export const auth0Middleware = auth({
  issuerBaseURL: `https://dev-dz5l44crimpcmeij.eu.auth0.com`,
  audience: `https://cinetrack-api`
})