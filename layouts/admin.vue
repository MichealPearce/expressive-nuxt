<script lang="ts">
import { layout } from '@store'
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class AdminLayout extends Vue {}
</script>

<template>
	<layout-base class="admin">
		<navigation-admin />

		<nuxt keep-alive :keep-alive-props="{ include: '^(Page|page).*' }" />
	</layout-base>
</template>

<style lang="scss" scoped>
@import '@sassy';

.layout.admin {
	display: grid;
	@include size(100vw, 100vh);

	grid-template-columns: auto 1fr;
	grid-template-rows: auto;
	align-items: center;

	overflow: hidden;
}
</style>
