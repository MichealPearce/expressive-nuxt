<script lang="ts">
import { Component, Prop, Model, Vue, Watch } from 'nuxt-property-decorator'
import { Emit, VModel } from 'vue-property-decorator'

@Component
export default class FormSwitch extends Vue {
	@Prop({ type: String, required: true }) name!: string
	@VModel({ type: Boolean, default: false }) checked!: boolean
}
</script>

<template>
	<div :for="name" class="input-switch">
		<input
			v-model="checked"
			class="input-switch-checkbox"
			type="checkbox"
			:name="name"
			:checked="checked"
		/>
		<div class="input-switch-graphic" />
	</div>
</template>
