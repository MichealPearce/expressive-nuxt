<script lang="ts">
import { Vue, Component, Prop, Ref, PropSync } from 'nuxt-property-decorator'

@Component
export default class FormSearch extends Vue {
	@Ref('inputEl') inputEl!: Vue

	@PropSync('search', { type: String, required: true }) query!: string
	@Prop({ type: [Array, Boolean], default: () => [] }) results!: any[]

	showResults: boolean = false

	mounted() {
		window.addEventListener('resize', () => this.$forceUpdate(), {
			passive: true
		})
	}

	beforeDestory() {
		window.removeEventListener('resize', () => this.$forceUpdate())
	}

	get element() {
		if (!this.inputEl) return false
		return this.inputEl
	}

	resultsStyles() {
		if (!this.inputEl) return false
		const inputRec = this.inputEl.$el.getBoundingClientRect()

		const styles = {
			'--results-x': `${inputRec.x}px`,
			'--results-y': `${inputRec.y + inputRec.height}px`,
			'--results-width': `${inputRec.width}px`,
			'--search-height': `${inputRec.height}px`
		}

		return styles
	}

	clear() {
		if (!this.showResults || !this.query.length) return
		this.showResults = false
		this.query = ''
	}
}
</script>

<template>
	<div
		class="form-search"
		:class="{ 'show-results': showResults && results.length }"
		:style="resultsStyles()"
		@focus.capture="showResults = true"
		@blur.self="showResults = false"
	>
		<form-input
			ref="inputEl"
			v-model="query"
			name="search"
			class="no-label flat no-padding search"
			placeholder="Search members..."
			autocomplete="off"
		/>

		<scroll-notifier @end="$emit('results-end')">
			<div class="search-results-wrap">
				<div class="search-results">
					<template v-for="(result, i) in results">
						<div
							:key="i"
							class="search-result"
							@click="
								() => {
									$emit('select-result', result)
									showResults = false
								}
							"
						>
							<slot name="result" :item="result" />
						</div>
					</template>
				</div>
			</div>
		</scroll-notifier>

		<form-button class="flat outline query" @click="clear">
			<i v-if="!showResults || !query.length" class="fas fa-search"></i>
			<i v-else class="fal fa-times"></i>
		</form-button>
	</div>
</template>

<style lang="scss" scoped>
@import '@sassy';

.form-search {
	@include flex(row, flex-start, stretch);
	position: relative;
	z-index: 20;
	background-color: white;
	border-radius: $border-radius;

	.form-input.search {
		flex: 1;

		border: 0px !important;
		// border-top-right-radius: 0px;
		// border-bottom-right-radius: 0px;

		z-index: 22;

		background-color: white;

		&::v-deep {
			.input-area {
				background-color: white;
			}
		}
	}

	.form-button.query {
		width: 35px;
		height: 35px;
		padding: 0px;
		border: none;
		margin-left: 0em;
		position: relative;
		z-index: 22;
		background-color: white;
	}

	.search-results-wrap {
		width: calc(100% + 4px);
		height: var(--search-height, 0px);
		padding-top: var(--search-height, 0px);

		position: absolute;
		left: 0em;
		top: -var(--search-height, 0px);
		z-index: 20;

		background-color: white;

		overflow: hidden;
		overflow-y: auto;

		border-radius: $border-radius;

		box-shadow: 0px 0px 5px rgba(#000, 0.13);

		opacity: 0;
		pointer-events: none;
		transition: opacity 0.15s 0.15s, height 0.25s;

		// &:before {
		// 	content: ' ';
		// 	width: 100%;
		// 	height: 100%;

		// 	position: absolute;
		// 	left: 0em;
		// 	top: 0em;
		// 	z-index: 21;

		// 	border-radius: $border-radius;
		// 	// border-top-right-radius: 0px;

		// 	@include glass-it(rgba($color-primary, 0));

		// 	opacity: 0;
		// 	pointer-events: none;
		// 	transition: opacity 0.15s;
		// }

		.search-results {
			display: grid;
			grid-auto-flow: row;

			.search-result {
				padding: 0.5em;
				background-color: transparent;
				color: $that-gray;

				transform: scale(0.95);
				border-radius: $border-radius;
				transition: transform 0.25s, background-color 0.25s, color 0.25s;
				cursor: pointer;

				&:hover {
					background-color: $color-primary;
					color: $color-primary-text;
					transform: scale(0.98);
				}
			}
		}
	}

	&.show-results {
		&:after,
		.search-results-wrap {
			opacity: 1;
			pointer-events: all;
		}

		.search-results-wrap {
			height: calc(var(--search-height, 0px) + 400%);
			transition: opacity 0.15s, height 0.25s;
		}
	}
}
</style>
