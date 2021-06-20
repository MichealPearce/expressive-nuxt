import { NextFunction, Request, Response } from 'express'
import m from 'moment-timezone'

export default function moment(
	req: Request,
	res: Response,
	next: NextFunction
) {
	m.tz.setDefault('UTC')
	req.moment = m
	next()
}
