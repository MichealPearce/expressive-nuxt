<script lang="ts">
import { Component, Prop, Emit, Vue, Watch } from 'nuxt-property-decorator'

@Component
export default class FormRadio extends Vue {
	@Prop({ type: String, required: true }) name!: string
	@Prop({ type: String, default: '' }) label!: string
	@Prop({ type: Object, required: true }) options!: { [label: string]: string }

	@Prop({ default: '' }) value!: string

	get optionsArray() {
		return Object.entries(this.options)
	}

	selectOption(v: any) {
		if (this.$attrs.disabled) return
		if (Array.isArray(this.value)) {
			if (this.value.includes(v))
				return this.$emit(
					'input',
					this.value.filter(h => v !== h)
				)
			else {
				return this.$emit('input', [...this.value, v])
			}
		} else if (v === this.value) {
			return this.$emit('input', false)
		} else {
			return this.$emit('input', v)
		}
	}

	isSelected(v: any) {
		if (Array.isArray(this.value)) return this.value.includes(v)
		return v === this.value
	}
}
</script>

<template>
	<div class="input-radio-buttons form-radio-buttons">
		<label
			v-if="label && label.length"
			class="input-radio-label input-label"
			:for="name"
			:title="$attrs.required ? 'Required' : 'Optional'"
		>
			<span class="input-label-text">{{ label }}</span>

			<span v-if="$attrs.required" class="input-required-mark">
				<i class="fad fa-comment-exclamation" style="--fa-primary-opacity: 1" />
			</span>
		</label>

		<div class="input-radio-wrap">
			<template v-for="[label, v] of optionsArray">
				<div
					:key="label"
					class="input-radio"
					:class="{ selected: isSelected(v) }"
					@click="() => selectOption(v)"
				>
					<slot name="option" :label="label" :value="value" :inputName="name">
						<input type="radio" :value="v" :name="name" />
						<div class="radio-mark" />
						<label :for="name" class="input-radio-label">{{ label }}</label>
					</slot>
				</div>
			</template>
		</div>
	</div>
</template>
