import * as V from 'vuex-module-decorators'

export module Layout {
	export interface Options {
		navigation: string
	}

	@V.Module({
		name: 'layout',
		stateFactory: true,
		namespaced: true
	})
	export class Module extends V.VuexModule {
		options: Options = {
			navigation: 'sidebar'
		}

		get navigation() {
			return this.options.navigation
		}

		@V.Mutation
		update(options: Options) {
			this.options = options
		}
	}
}

export default Layout.Module
