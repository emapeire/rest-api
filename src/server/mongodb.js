import { createApp } from '../app.js'
import { MovieModel } from '../mvc/models/mongodb/movie.js'

createApp({ movieModel: MovieModel })
