<script lang="ts">
import { layout, menus } from '@store'
import { ADMIN_MENU } from '@store/menus'
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
	layout: 'admin',
	middleware: ['authed']
})
export default class PageAdmin extends Vue {
	mounted() {
		menus.setSidebar(ADMIN_MENU)
	}

	destroyed() {
		// update menus
		const main = menus.areas['main-menu']
		if (main) menus.setSidebar(main)
		else menus.setSidebar([{ title: 'admin', url: '/admin' }])
		// else menus.fetch('main-menu').finally(() => menus.setSidebar('main-menu'))
	}
}
</script>

<template>
	<page-base class="admin">
		<nuxt-child />
	</page-base>
</template>

<style lang="scss" scoped>
@import '@sassy';
</style>
