import { Express } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

export default function proxies(app: Express) {
	const FrontEndProxy = createProxyMiddleware({
		target: process.env.CLIENT_URL
	})

	app.use(FrontEndProxy)
	return FrontEndProxy
}
