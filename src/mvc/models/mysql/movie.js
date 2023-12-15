import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'moviesdb'
}

const conection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()
      const [genres] = await conection.query(
        'SELECT id, name FROM genre WHERE LOWER(name) = ?;',
        [lowerCaseGenre]
      )
      if (genres.length === 0) return []
      const [{ id }] = genres
      return []
    }

    const [movies] = await conection.query(
      'SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie;'
    )
    return movies
  }

  static async getById({ id }) {
    const [movies] = await conection.query(
      'SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie WHERE id = UUID_TO_BIN(?);',
      [id]
    )
    if (movies.length === 0) return null
    return movies[0]
  }

  static async create({ input }) {
    //
  }

  static async delete({ id }) {
    //
  }

  static async update({ id, input }) {
    //
  }
}
