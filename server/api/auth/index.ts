import User from '@server/database/models/User'
import { compareSync } from 'bcrypt'
import { Router } from 'express'

const router = Router()
export default router

class APIError extends Error {
	constructor(public status: number, public message: string) {
		super(message)
	}

	toJSON() {
		return this.message
	}
}

router
	.post('/auth', (req, res) => {
		const { username, password } = req.body
		if (!username || !password)
			return res.status(400).json('username or password was not provided')

		return User.findOneOrFail({
			where: [{ name: username }, { email: username }],
			select: ['name', 'email', 'password']
		})
			.then(user => {
				if (!compareSync(password, user.password))
					throw new APIError(401, 'incorrect username or password')
				delete user.password
				return user.load()
			})
			.then(user => {
				req.session.user = user
				res.json(user)
			})
			.catch(error => {
				if (error instanceof APIError) res.status(error.status).json(error)
				else res.status(500)
			})
			.finally(() => res.end())
	})
	.delete('/auth', (req, res) => {
		return req.session.destroy(() => res.end())
	})
