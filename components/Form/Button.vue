<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class FormButton extends Vue {}
</script>

<template>
	<button class="form button">
		<slot />
	</button>
</template>

<style lang="scss" scoped>
@import '@sassy';

.form.button {
	padding: 0.5em 1em;

	border: none;
	border-radius: $border-radius;

	background-color: $color-primary;
	color: $color-primary-text;

	cursor: pointer;
	transition: all 0.25s;

	&:hover {
		background-color: $color-primary-darken;
	}
}
</style>
