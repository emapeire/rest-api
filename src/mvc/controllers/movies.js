// import { MovieModel } from '../models/local-fs/movie.js'
import { MovieModel } from '../models/mysql/movie.js'
import { validateMovie, validatePartialMovie } from '../../schemas/index.js'

export class MovieController {
  static async getAll(req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
    res.json(movies)
  }

  static async getById(req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'Movie not found' })
  }

  static async create(req, res) {
    const result = validateMovie(req.body)
    if (result.error) {
      return res.status(422).json({ error: JSON.parse(result.error.message) })
    }
    const newMovie = await MovieModel.create({ movie: result.data })
    res.status(201).json(newMovie)
  }

  static async update(req, res) {
    const result = validatePartialMovie(req.body)
    if (result.error) {
      return res.status(422).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedMovie = await MovieModel.update({ id, movie: result.data })
    res.status(200).json({
      message: 'Movie updated successfully',
      movie: updatedMovie
    })
  }

  static async delete(req, res) {
    const { id } = req.params
    const result = await MovieModel.delete({ id })
    if (result === false) {
      return res.status(404).json({ message: 'Movie not found' })
    }
    res.status(200).json({
      message: 'Movie deleted successfully'
    })
  }
}
