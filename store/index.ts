import { Store, ActionTree } from 'vuex'
import { initialiseStores } from '@includes/store-accessor'

const initializer = (store: Store<any>) => initialiseStores(store)

export interface RootState {}

export const plugins = [initializer]
export * from '@includes/store-accessor'

export const state = () => ({
	test: false
})

export const mutations = {
	test(state, p) {
		state.test = p
	}
}

export const actions: ActionTree<RootState, RootState> = {
	nuxtServerInit(ctx, { req }) {
		console.log('nuxt init', req.session)
		ctx.commit('test', req.session.test)
	}
}
