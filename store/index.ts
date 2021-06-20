import { Store, ActionTree } from 'vuex'
import { initialiseStores } from '@includes/store-accessor'

const initializer = (store: Store<any>) => initialiseStores(store)

export interface RootState {}

export const plugins = [initializer]
export * from '@includes/store-accessor'

export const state = () => ({})

export const mutations = {}

export const actions: ActionTree<RootState, RootState> = {
	nuxtServerInit(ctx, { req }) {
		if (req?.session?.user) ctx.commit('auth/set', req.session.user)
	}
}
