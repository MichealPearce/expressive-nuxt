<script lang="ts">
import { Vue, Component, Prop, Emit } from 'nuxt-property-decorator'

@Component
export default class FormComponent extends Vue {
	@Prop({ type: Array, default: () => [] }) fields!: any[]

	@Emit('submit')
	submit(event: Event) {
		const form = event.target as HTMLFormElement
		return new FormData(form)
	}
}
</script>

<template>
	<form class="form form-component" @submit.prevent="submit">
		<slot />
	</form>
</template>

<style lang="scss" scoped>
@import '@assets/styles/sassy';

form.form {
	display: grid;
	grid-auto-flow: row;
	row-gap: 1em;
}

// .input-box {
// 	width: 100%;

// 	label,
// 	input {
// 		width: 100%;
// 	}

// 	input {
// 		padding: 0.25em;
// 	}
// }
</style>
