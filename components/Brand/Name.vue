<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class BrandingName extends Vue {
	@Prop({ type: String, default: 'span' })
	element!: string
}
</script>

<template>
	<component :is="element" class="brand name">
		Social<span>Access</span>
	</component>
</template>

<style lang="scss" scoped>
@import '@sassy';

.brand.name {
	color: black;

	span {
		color: $color-primary;
	}
}
</style>
