import { randomUUID } from 'node:crypto'
import { readJSON } from '../utils/index.js'

const movies = readJSON('../data/movies.json')

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      return movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      )
    }
    return movies
  }

  static async getById({ id }) {
    const movie = movies.find((movie) => movie.id === id)
    return movie
  }

  static async create({ movie }) {
    const newMovie = {
      id: randomUUID(),
      ...movie
    }
    movies.push(newMovie)
    return newMovie
  }

  static async update({ id, movie }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id)
    if (movieIndex === -1) return false
    movies[movieIndex] = {
      ...movies[movieIndex],
      ...movie
    }
    return movies[movieIndex]
  }

  static async delete({ id }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id)
    if (movieIndex === -1) return false
    movies.splice(movieIndex, 1)
    return true
  }
}
