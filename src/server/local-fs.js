import { createApp } from '../app.js'
import { MovieModel } from '../mvc/models/local-fs/movie.js'

createApp({ movieModel: MovieModel })
