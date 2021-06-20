import User from '@database/models/User'
import { hashSync } from 'bcrypt'

function setupAdmin() {
	const debug = require('debug')('sa:setup:admin')
	debug('checking admin account')
	const admin = new User({
		name: 'admin',
		email: 'root@localhost'
	})

	return admin
		.load()
		.then(() => debug('admin account exists'))
		.catch(() => {
			debug('creating admin account...')

			admin.password = hashSync('password', process.env.PASSWORD_SALT as string)

			return admin.save().then(() => debug('admin account created'))
		})
		.finally(() => debug('finished admin account check'))
}

export default async function setup() {
	const debug = require('debug')('sa:setup')
	debug('running setup')

	await setupAdmin()

	debug('setup complete')
}
