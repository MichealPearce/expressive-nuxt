<script lang="ts">
import _ from 'lodash'
import { Vue, Component, Prop, Emit } from 'nuxt-property-decorator'

@Component
export default class FormDynamic extends Vue {
	checkboxOptions: Object = {}
	dropdownOptions: Object = {}
	longText: string = ''
	shortText: string = ''
	checkboxText: string = ''
	@Prop({ type: Array, default: () => [] }) fields!: any
	@Prop({ type: String, default: '' }) title!: string
	@Prop({ type: String, default: '' }) subtitle!: string
	@Emit('submit')
	submit(event: Event) {
		const form = event.target as HTMLFormElement
		return new FormData(form)
	}

	mounted() {
		// this.fields.reverse().forEach((value: any) => {
		// 	switch (value.field_type) {
		// 		case 'dropdown': {
		// 			const dropOption = value.options
		// 			this.dropDown(dropOption)
		// 			break
		// 		}
		// 		case 'checkbox': {
		// 			const checkboxOption = value.options
		// 			this.checkBox(checkboxOption)
		// 			break
		// 		}
		// 	}
		// })
	}

	dropDown(options: any) {
		const mappedKeys = _.mapKeys(options, 'title')
		this.dropdownOptions = _.mapValues(mappedKeys, v => v.id)
	}

	checkBox(options: any) {
		const mappedKeys = _.mapKeys(options, 'title')
		this.checkboxOptions = _.mapValues(mappedKeys, v => v.id)
	}
}
</script>

<template>
	<form class="form layout-row" @submit.prevent="submit">
		<h2 class="panel-title">{{ title }}</h2>
		<div class="form-area">
			<div v-for="field in fields" :key="field.id">
				<div v-if="field.field_type === 'long'">
					<h3 class="form-title">Anything else you want us to know?</h3>
					<form-text-area
						v-model="longText"
						class="expanded form-field"
						:label="field.title"
						:name="'test'"
						:clearable="true"
						:placeholder="field.help_text"
						:required="false"
						:autocomplete="'test'"
					/>
				</div>
				<div v-if="field.field_type === 'short'">
					<h3 class="form-title">who is in your party?</h3>
					<form-input
						v-model="shortText"
						class="expanded form-field"
						:name="'test'"
						:clearable="true"
						:placeholder="field.title"
						:required="false"
						:autocomplete="'test'"
						:label="'test label'"
					/>
				</div>
				<div v-if="field.field_type === 'checkbox'" class="event-filter">
					<h3 class="form-title">Another for question?</h3>
					<form-radio
						v-model="checkboxText"
						class="radio-mark filter-options column flat no-bg"
						:name="field.title"
						:options="checkboxOptions"
					/>
				</div>
				<!-- <select name="Test dropdown">
					<option value="1">Test dropdown1</option>
					<option value="1">Test dropdown2</option>
					<option value="1">Test dropdown3</option>
				</select> -->
			</div>
		</div>
		<div v-if="fields" class="fbtn-area form-field">
			<form-button :label="'Reserve'" class="reserve-btn" :disabled="false" />
		</div>
	</form>
</template>

<style lang="scss" scoped>
@import '@assets/styles/sassy';

.input-box {
	width: 100%;

	label,
	input {
		width: 100%;
	}

	input {
		padding: 0.25em;
	}
}

.form-area {
	max-height: 150px;
	overflow: hidden;
	overflow-y: auto;
	.form-field,
	.form-title {
		margin: 0.5em;
	}
	.form-title {
		font-weight: 500;
	}
}
.fbtn-area {
	margin-top: 0.5em;
	.reserve-btn {
		background-color: white;
		color: #212121;
		position: relative;
		float: right;
	}
}

.event-filter {
	.filter-options {
		--input-radio-mark-color-background: white;
		--input-radio-mark-color: #91bbbe;

		width: 100%;
		color: white;
	}
}
</style>
