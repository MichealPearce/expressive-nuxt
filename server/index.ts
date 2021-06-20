import http from 'http'
import express from 'express'
import _ from 'lodash'
import api from '@api/index'
import session from './middleware/session'

const { loadNuxt, build } = require('nuxt')

const render = express()
const { APP_HOST, APP_PORT, NODE_ENV } = process.env
const dev = NODE_ENV !== 'production'

export default loadNuxt(dev ? 'dev' : 'start').then(async nuxt => {
	if (dev) await build(nuxt)

	render.use(session)
	render.use('/api', api)

	render.use((req, res, next) => {
		;(req.session as any).test = Math.random()
		next()
	})

	render.use(nuxt.render)

	const server = http.createServer(render)
	server.listen(Number(APP_PORT), APP_HOST, () => {
		console.info(`server listening on port ${APP_PORT}`)
	})

	return server
})
