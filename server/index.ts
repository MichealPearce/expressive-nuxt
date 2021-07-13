import http from 'http'
import express from 'express'
import _ from 'lodash'
import api from '@api/index'
import { loadNuxt, build } from 'nuxt'
import session from './middleware/session'
import routes from './routes'

// Nuxt's render (using Connect) seems to ignore or override any handlers added to it so we create our own instance
const render = express()
const { APP_HOST, APP_PORT, NODE_ENV } = process.env
const dev = NODE_ENV !== 'production'

// start up Nuxt
export default loadNuxt(dev ? 'dev' : 'start').then(async nuxt => {
	if (dev) await build(nuxt)

	// attach basic middleware used in all routes
	render.use(session)
	render.use(express.json())

	// attach the api routes
	render.use('/api', api)

	// attach developer defined routes used for modifying or piping data to Nuxt
	render.use(routes)
	render.use(nuxt.render)

	const server = http.createServer(render)
	server.listen(Number(APP_PORT), APP_HOST, () => {
		console.info(`server listening on port ${APP_PORT}`)
	})

	return server
})
