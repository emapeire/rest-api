import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

const app = express()

app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

app.use('/movies', moviesRouter)

const port = process.env.PORT ?? 8080

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}/movies`)
})
