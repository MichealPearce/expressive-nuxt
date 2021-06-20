import User, { UserData } from '@database/models/User'
import { Express } from 'express'
import { Session, SessionData } from 'express-session'
import moment from 'moment-timezone'

declare module 'express-session' {
	interface Session {
		user?: UserData
	}

	interface SessionData {
		user?: UserData
	}
}

declare module 'express' {
	interface Request extends Express.Request {
		session: Session & Partial<SessionData>
		sessionStore: any
		ServingSocket: boolean
		authed?: User
	}
}

declare global {
	namespace session {
		interface Session {
			user?: UserData
		}

		interface SessionData {
			user?: UserData
		}
	}

	namespace Express {
		interface Request {
			session: Session & Partial<SessionData>
			authed?: User
		}
	}
}

declare module 'http' {
	interface IncomingMessage {
		sessionID: any
		session: Session & Partial<SessionData>
		authed?: User
		data?: any
		moment?: typeof moment
	}
}
