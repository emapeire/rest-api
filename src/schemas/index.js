const z = require('zod')
const movieGenres = require('../enum')

const movieShema = z.object({
  title: z
    .string({
      invalid_type_error: 'Title must be a string',
      required_error: 'Title is required'
    })
    .min(1)
    .max(255),
  year: z
    .number({
      invalid_type_error: 'Year must be a number',
      required_error: 'Year is required'
    })
    .int()
    .min(1900)
    .max(2024),
  director: z
    .string({
      invalid_type_error: 'Director must be a string',
      required_error: 'Director is required'
    })
    .min(1)
    .max(255),
  duration: z
    .number({
      invalid_type_error: 'Duration must be a number',
      required_error: 'Duration is required'
    })
    .int()
    .min(1)
    .max(300),
  poster: z
    .string({
      invalid_type_error: 'Poster must be a string',
      required_error: 'Poster is required'
    })
    .url()
    .endsWith('.jpg'),
  genre: z
    .array(z.enum(movieGenres), {
      required_error: 'Genre is required',
      invalid_type_error: 'Genre must be an array of strings'
    })
    .min(1)
    .max(3),
  rate: z
    .number({
      invalid_type_error: 'Rate must be a number',
      required_error: 'Rate is required'
    })
    .min(0)
    .max(10)
    .optional()
})

function validateMovie(movie) {
  return movieShema.safeParse(movie)
}

module.exports = validateMovie
