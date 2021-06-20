import User from '@database/models/User'
import { NextFunction, Request, Response } from 'express'

export default function authed(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const debug = require('debug')('sa-deep:middleware:authed')
	const userData = req.session.user
	if (!userData) {
		return res.status(401).end()
	} else {
		return new User(userData)
			.load()
			.then(user => {
				debug('user authenicated and loaded')
				req.authed = user
				next()
			})
			.catch(err => {
				debug(err)
				console.error(
					'user as session data, but could not be found in the database. Destroying session'
				)

				req.session.destroy(() => {
					return res.status(401).end()
				})
			})
	}
}
