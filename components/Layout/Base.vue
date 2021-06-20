<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class LayoutBase extends Vue {}
</script>

<template>
	<div class="layout base">
		<slot />
	</div>
</template>

<style lang="scss" scoped>
@import '@sassy';
</style>
