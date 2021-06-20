<script lang="ts">
import { Vue, Component, VModel, Prop } from 'nuxt-property-decorator'

@Component
export default class FormInput extends Vue {
	@VModel({ type: String })
	input_value!: any

	@Prop({ type: String, default: 'text' })
	type!: string

	@Prop({ type: Object as () => Record<string, any>, default: () => ({}) })
	input!: Record<string, any>

	get input_props() {
		return {
			type: this.type,
			...this.input
		}
	}
}
</script>

<template>
	<div class="form input">
		<label v-if="input_props.label" :for="input_props.name">{{
			input_props.label
		}}</label>
		<input v-model="input_value" v-bind="input_props" />
	</div>
</template>

<style lang="scss" scoped>
@import '@sassy';

.form.input {
	@include flex(column);

	label {
		margin-bottom: 0.25em;
	}

	input {
		padding: 0.5em 1em;

		border: none;
		border-radius: $border-radius;
	}
}
</style>
