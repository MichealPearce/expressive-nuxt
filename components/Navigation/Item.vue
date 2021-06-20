<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class NavigationItem extends Vue {
	@Prop({ type: Object, required: true })
	item!: any

	get is_external() {
		return this.item.url.startsWith('http')
	}
}
</script>

<template>
	<nuxt-link v-if="!is_external" :to="item.url">{{ item.title }}</nuxt-link>
	<a v-else :href="item.url" target="_blank">{{ item.title }}</a>
</template>

<style lang="scss" scoped>
@import '@sassy';
</style>
