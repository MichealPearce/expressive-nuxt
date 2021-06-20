import Koa from 'koa'
declare module 'koa' {
	interface DefaultContext extends Koa.BaseContext {
		json(data: any): DefaultContext
	}
}
