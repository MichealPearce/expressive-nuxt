import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

const debug = require('debug')('sa:mailer')

export class Mailer {
	_mail: Mail
	from: string = process.env.SMTP_SENDER

	constructor(args: SMTPTransport.Options) {
		this._mail = nodemailer.createTransport(args)

		debug('verifying SMTP connection')
		this._mail
			.verify()
			.then(() => debug('verified SMTP connection'))
			.catch(err => console.warn('failed to verify connection to SMTP host.', err))
	}

	send(args: Mail.Options) {
		args.from = this.from
		return this._mail.sendMail(args)
	}
}

export default new Mailer({
	host: process.env.SMTP_HOST,
	port: Number(process.env.SMTP_PORT),
	secure: false,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS
	}
})
