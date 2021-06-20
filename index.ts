import 'module-alias/register'
import 'reflect-metadata'
import '@includes/types/express'

import { Connection, createConnections } from 'typeorm'
import setup from '@includes/setup'

require('source-map-support').install()
require('dotenv').config()

declare global {
	namespace NodeJS {
		interface Global {
			db: Connection | Connection[]
			app_root: string
		}
	}
}

global.app_root = __dirname

console.log = require('debug')('sa:')
console.info = require('debug')('sa:info')
// console.error = require('debug')('sa:ERROR')
console.warn = require('debug')('sa:WARN')

const debug = require('debug')('sa:init')
console.info('creating database connection')
createConnections()
	.then(connection => {
		console.info('database connection created')

		// Add connection to global scope for use later
		global.db = connection

		if (process.env.SMTP_ENABLED === 'true') import('@includes/mailer')
		return setup()
			.then(() => import('./server'))
			.catch(err => {
				throw err
			})
	})
	.catch(error => {
		debug('failed creating database connection, halting %O', error)
		process.exit()
	})
