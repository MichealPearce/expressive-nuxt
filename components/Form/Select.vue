<script lang="ts">
import helpers from '@includes/helpers'
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class FormSelect extends Vue {
	@Prop({ type: String }) name!: string
	@Prop({ type: String, default: 'text' }) type!: string
	@Prop({ type: Boolean }) clearable!: boolean
	@Prop({ type: String, default: '' }) placeholder!: string
	@Prop({ type: Boolean }) required!: boolean
	@Prop({ type: String }) autocomplete!: string
	@Prop({ type: Boolean, default: false }) readonly!: boolean
	// add label props
	@Prop({ type: String, default: '' }) label!: string

	@Prop({ default: '' }) value!: string
	@Prop({ type: Object }) options!: any

	get listeners() {
		return helpers.exclude(this.$listeners, ['input'])
	}

	get hasValue() {
		return this.value.length
	}

	get inputAttrs() {
		return {
			name: this.name,
			type: this.type
		}
	}

	get pairedOptions() {
		return Object.entries(this.options)
	}

	clearInput() {
		this.$emit('input', '')
	}
}
</script>

<template>
	<!--remove design in :class="[hasValue ? 'has-value' : false, type] -->
	<div
		class="form-input form-select expanded"
		:class="[hasValue ? 'has-value' : false, type]"
	>
		<label
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

		<div class="input-area">
			<slot v-if="$slots.input" name="input" />
			<select
				v-else
				v-bind="$attrs"
				:value="value"
				:name="name"
				:placeholder="placeholder"
				:type="type"
				:required="required"
				:autocomplete="autocomplete"
				:readonly="readonly"
				@input="$emit('input', $event.target.value)"
				v-on="listeners"
			>
				<option v-for="(option, key) of options" :key="key" :value="key">
					{{ option }}
				</option>
			</select>

			<slot name="input-extra" />
		</div>
	</div>
</template>
