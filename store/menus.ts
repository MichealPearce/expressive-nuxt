import { $api } from '@plugins/api'
import * as V from 'vuex-module-decorators'

export const ADMIN_MENU = [
	{
		title: 'Home',
		url: '/'
	},
	{
		title: 'Dashboard',
		children: [
			{
				title: 'Users',
				url: '/admin/users'
			}
		]
	},
	{
		title: 'Logout',
		url: '/login?logout=true'
	}
]

export module Menus {
	export interface Areas {
		[name: string]: any
	}

	@V.Module({
		name: 'menus',
		stateFactory: true,
		namespaced: true
	})
	export class Module extends V.VuexModule {
		areas: Areas = {}
		sidebar: any[] = []

		@V.Mutation
		setSidebar(payload: any[] | string) {
			if (Array.isArray(payload)) this.sidebar = payload
			else if (this.areas[payload]) this.sidebar = this.areas[payload]
			else this.sidebar = []
		}

		@V.Mutation
		setArea(payload: { area: string; data: any }) {
			this.areas[payload.area] = payload.data
		}

		@V.Action({ rawError: true })
		fetch(slug: string) {
			return $api
				.$get(`/menus/${slug}`)
				.then(data => this.context.commit('setArea', { area: slug, data }))
		}

		@V.Action
		create(data?: any) {
			return $api.$post('/menus', data)
		}
	}
}

export default Menus.Module
