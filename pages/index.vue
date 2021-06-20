<script lang="ts">
import { menus } from '@store'
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class PageIndex extends Vue {
	createMenu() {
		menus
			.create({
				name: 'Main Menu',
				items: [
					{
						title: 'Home',
						url: '/'
					},
					{
						title: 'About',
						url: '/about'
					},
					{
						title: 'Contact',
						url: '/contact'
					}
				]
			})
			.then(console.log)
			.catch(console.log)
	}
}
</script>

<template>
	<page-base>
		<button @click="createMenu">create menu</button>
	</page-base>
</template>

<style lang="scss" scoped>
@import '@sassy';
</style>
