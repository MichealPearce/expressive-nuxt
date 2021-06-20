import { Plugin } from '@nuxt/types'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

declare module 'vue/types/vue' {
	// this.$myInjectedFunction inside Vue components
	interface Vue {
		$api: NuxtAxiosInstance
	}
}

declare module '@nuxt/types' {
	// nuxtContext.app.$myInjectedFunction inside asyncData, fetch, plugins, middleware, nuxtServerInit
	interface NuxtAppOptions {
		$api: NuxtAxiosInstance
	}
	// nuxtContext.$myInjectedFunction
	interface Context {
		$api: NuxtAxiosInstance
	}
}

declare module 'vuex/types/index' {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface Store<S> {
		$api: NuxtAxiosInstance
	}
}

export let $api: NuxtAxiosInstance

const APIPlugin: Plugin = (context, inject) => {
	$api = context.$axios.create({
		baseURL: 'http://localhost:3000/api/',
		withCredentials: true
	})

	inject('api', $api)
}

export default APIPlugin
