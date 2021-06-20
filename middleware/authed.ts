import { Middleware } from '@nuxt/types'

const Authed: Middleware = ctx => {
	const user = ctx.store.state.auth.user
	if (!user && !ctx.route.fullPath.startsWith('/login'))
		ctx.redirect(301, '/login')
}

export default Authed
