import session from 'express-session'

const FileStore = require('session-file-store')(session)

export default session({
	name: 'sa-session-id',
	secret: process.env.PASSWORD_SALT,
	resave: false,
	saveUninitialized: false,
	cookie: {
		domain: process.env.CLIENT_HOST,
		maxAge: 100000000
	},
	store: new FileStore({
		path: './bin/.sessions',
		retries: 0
	})
})
