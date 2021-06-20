<script lang="ts">
import { layout } from '@store'
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class LayoutDefault extends Vue {
	get navigation() {
		return layout.navigation.startsWith('navigation')
			? layout.navigation
			: `navigation-${layout.navigation}`
	}
}
</script>

<template>
	<layout-base class="default">
		<component :is="navigation" />

		<nuxt keep-alive :keep-alive-props="{ include: '^(Page|page).*' }" />
	</layout-base>
</template>

<style lang="scss" scoped>
@import '@sassy';

.layout.default {
	display: grid;
	@include size(100vw, 100vh);

	grid-template-columns: auto 1fr;
	grid-template-rows: auto;
	align-items: center;

	overflow: hidden;
}
</style>
