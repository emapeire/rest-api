import { Router } from 'express'
import { MovieController } from '../mvc/controllers/movies.js'

export const moviesRouter = Router()

moviesRouter.get('/', MovieController.getAll)
moviesRouter.post('/', MovieController.create)

moviesRouter.get('/:id', MovieController.getById)
moviesRouter.put('/:id', MovieController.update)
moviesRouter.delete('/:id', MovieController.delete)
