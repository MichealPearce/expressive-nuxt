<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class PageAdminIndex extends Vue {}
</script>

<template>
	<page-base>
		<h1>admin index</h1>
	</page-base>
</template>

<style lang="scss" scoped>
@import '@sassy';
</style>
