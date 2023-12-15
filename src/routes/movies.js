import { Router } from 'express'
import { MovieController } from '../mvc/controllers/movies.js'

export const moviesRouter = Router()

moviesRouter.get('/', MovieController.getAll)

moviesRouter.get('/:id', MovieController.getById)

moviesRouter.post('/', MovieController.create)

moviesRouter.put('/:id', MovieController.update)

moviesRouter.delete('/:id', MovieController.delete)
