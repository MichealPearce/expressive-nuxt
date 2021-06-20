<script lang="ts">
import { Component, Prop, Watch, Emit, Vue } from 'nuxt-property-decorator'

@Component
export default class FormInput extends Vue {
	@Prop({ type: String }) name!: string
	@Prop({ type: String }) label?: string

	@Prop({ type: Boolean }) clearable!: boolean

	@Prop({ type: String, default: '' }) placeholder!: string
	@Prop({ type: String, default: '' }) value!: string
	@Prop({ type: String, default: 'text' }) type!: string
	@Prop({ type: Boolean }) required!: boolean
	@Prop({ type: String }) autocomplete!: string

	get hasValue() {
		return this.value.length
	}

	get inputAttrs() {
		return {
			name: this.name,
			type: this.type
		}
	}

	clearInput() {
		this.value = ''
	}
}
</script>

<template>
	<div
		class="form-input textarea"
		:class="[hasValue ? 'has-value' : false, type]"
	>
		<label
			v-if="label"
			:for="name"
			class="input-label"
			:title="required ? 'Required' : 'Optional'"
		>
			<span class="input-label-text">{{ label }}</span>

			<span v-if="required" class="input-required-mark">
				<i class="fad fa-comment-exclamation" style="--fa-primary-opacity: 1" />
			</span>
		</label>

		<span v-if="clearable && hasValue" class="input-clear" @click="clearInput">
			<i class="far fa-times-circle" />
		</span>

		<div
			class="input-area"
			:style="type === 'color' && value ? `--selected-color: ${value};` : ''"
		>
			<span v-if="type === 'color'" class="color-select-text"> Select Color </span>
			<textarea
				v-bind="$attrs"
				:value="value"
				:name="name"
				:placeholder="placeholder"
				:type="type"
				:required="required"
				:autocomplete="autocomplete"
				@input="$emit('input', $event.target.value)"
			>
			</textarea>
		</div>
	</div>
</template>
