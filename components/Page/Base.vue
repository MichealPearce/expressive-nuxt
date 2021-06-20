<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class PageBase extends Vue {}
</script>

<template>
	<div class="page base">
		<slot />
	</div>
</template>

<style lang="scss" scoped>
@import '@sassy';

.page.base {
	width: 100%;
	height: 100%;
	background-color: $color-page-background;
}
</style>
