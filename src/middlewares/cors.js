import cors from 'cors'

const ALLOWED_ORIGINS = ['http://localhost:8080', 'http://localhost:8081']

export const corsMiddleware = ({ allowedOrigins = ALLOWED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  })
