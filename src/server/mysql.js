import { createApp } from '../app.js'
import { MovieModel } from '../mvc/models/mysql/movie.js'

createApp({ movieModel: MovieModel })
