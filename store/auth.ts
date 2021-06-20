import { $api } from '@plugins/api'
import * as V from 'vuex-module-decorators'

export module Auth {
	@V.Module({
		name: 'auth',
		stateFactory: true,
		namespaced: true
	})
	export class Module extends V.VuexModule {
		user: any = false

		@V.MutationAction({ mutate: ['user'], rawError: true })
		login(creds: any) {
			return $api.$post('auth', creds).then(user => ({ user }))
		}

		@V.MutationAction({ mutate: ['user'], rawError: true })
		fetch() {
			return $api.$get('auth').then(user => ({ user }))
		}

		@V.MutationAction({ mutate: ['user'], rawError: true })
		logout() {
			return $api.$delete('auth').then(() => ({ user: false }))
		}
	}
}

export default Auth.Module
