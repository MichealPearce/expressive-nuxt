import { loadAPIRoutes } from '@includes/functions'
import { Router } from 'express'

const api = Router()
export default api

loadAPIRoutes(api, ['auth'])

// prevent fall thru
api.use((req, res) => res.status(404).end())
