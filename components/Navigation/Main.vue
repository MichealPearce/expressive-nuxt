<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class NavigationMain extends Vue {}
</script>

<template>
	<nav class="navigation main">
		<section class="site-branding">
			<brand-name />
		</section>

		main
	</nav>
</template>

<style lang="scss" scoped>
@import '@sassy';
</style>
