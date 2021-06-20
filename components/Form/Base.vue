<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class FormBase extends Vue {
	submit(event: Event) {
		const form = event.target as HTMLFormElement
		const data = new FormData(form)
		const json: any = {}

		data.forEach((v, k) => (json[k] = v))

		return this.$emit('submit', json, data, event)
	}
}
</script>

<template>
	<form class="form base" @submit.prevent="submit">
		<slot />
	</form>
</template>

<style lang="scss" scoped>
@import '@sassy';

.form.base {
	display: grid;
	grid-auto-flow: row;
	row-gap: 1em;
}
</style>
