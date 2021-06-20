<script lang="ts">
import { menus } from '@store'
import { ADMIN_MENU } from '@store/menus'
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class NavigationAdmin extends Vue {
	get menu() {
		return ADMIN_MENU
	}
}
</script>

<template>
	<nav class="navigation admin">
		<section class="site branding">
			<brand-name element="h3" />
		</section>

		<slot>
			<navigation-menu :menu="menu" />
		</slot>
	</nav>
</template>

<style lang="scss" scoped>
@import '@sassy';

.navigation.menu::v-deep {
	display: grid;
	grid-auto-flow: row;
	row-gap: 0.5em;

	.navigation.item {
		display: block;
		padding: 0.5em;

		transition: all 0.25s;
		border-radius: $border-radius;

		&:hover {
			background-color: black;
			color: white;
		}
	}
}

.navigation.admin {
	height: 80%;
	padding: 1em 1.5em;

	border-right: 2px solid lightgray;

	overflow: hidden;
	overflow-y: auto;

	.site.branding {
		margin-bottom: 1em;
	}
}
</style>
