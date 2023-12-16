import express, { json } from 'express'
import { createMovieRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'
import 'dotenv/config.js'

export const createApp = ({ movieModel }) => {
  const app = express()

  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  app.use('/movies', createMovieRouter({ movieModel }))

  app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/src/client/index.html')
  })

  const port = process.env.PORT ?? 8080

  app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}/movies`)
  })
}
