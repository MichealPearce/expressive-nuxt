<script lang="ts">
import {
	Component,
	Prop,
	Model,
	Vue,
	Watch,
	Ref,
	Emit
} from 'nuxt-property-decorator'

export interface iRippleSize {
	width: number
	height: number
}

export interface iRipplePosition {
	left: number
	top: number
}

export interface iMousePosition {
	x: number
	y: number
}

export interface RippleState {
	clicked: boolean
	animationInterval: any | null
	size: iRippleSize
	position: iRipplePosition
	mouse: iMousePosition
}

@Component
export default class FormButton extends Vue {
	@Prop({ type: String }) label!: string
	@Prop({ type: Boolean, default: false }) disabled!: string
	@Prop({ type: String, default: 'button' }) type!: string

	@Ref() container!: HTMLElement
	@Ref('ripple') rippleEl!: HTMLElement

	ripple: RippleState = {
		clicked: false,
		animationInterval: false,
		size: {
			width: 0,
			height: 0
		},
		position: {
			left: 0,
			top: 0
		},
		mouse: {
			x: 0,
			y: 0
		}
	}

	mouseover: boolean = false

	get rippleSize() {
		return this.ripple.size
	}

	set rippleSize(values) {
		this.ripple.size = values
	}

	get ripplePosition() {
		return this.ripple.position
	}

	set ripplePosition(values) {
		this.ripple.position = values
	}

	get mouse() {
		return this.ripple.mouse
	}

	set mouse(values) {
		this.ripple.mouse = values
	}

	onMouseMove(event: any) {
		if (!this.disabled) this.mouseover = true
		const { layerX, layerY } = event
		if (!this.ripple.clicked) {
			this.mouse = { x: layerX, y: layerY }
		}
	}

	onMouseLeave() {
		this.mouseover = false
	}

	@Emit('click')
	onClick(event: MouseEvent) {
		if (!this.ripple.clicked && !this.ripple.animationInterval) {
			let sizeIncrement = 50
			const containerEl = this.container
			if (containerEl) sizeIncrement = containerEl.offsetWidth / 10

			this.ripple.clicked = true
			this.ripple.animationInterval = setInterval(() => {
				this.rippleSize.width += sizeIncrement
				this.rippleSize.height += sizeIncrement
				this.updateRipplePosition()
			}, 10)

			setTimeout(() => {
				this.ripple.clicked = false
				this.ripple.animationInterval = clearInterval(this.ripple.animationInterval)
				this.rippleSize = { width: 0, height: 0 }
				this.updateRipplePosition()
			}, 300)
		}
	}

	@Watch('mouse')
	updateRipplePosition() {
		const [size, mouse, el] = [this.rippleSize, this.mouse, this.rippleEl]
		const [left, top] = [mouse.x - size.width / 2, mouse.y - size.height / 2]
		this.ripplePosition = { left, top }
		this.updateRippleElement()
	}

	@Watch('ripple')
	updateRippleElement() {
		const [size, { left, top }, el] = [
			this.rippleSize,
			this.ripplePosition,
			this.rippleEl
		]

		if (el) {
			el.style.left = `${left}px`
			el.style.top = `${top}px`
			el.style.width = `${size.width}px`
			el.style.height = `${size.height}px`
		}
	}
}
</script>

<template>
	<button
		ref="container"
		class="form-button form button"
		:class="[ripple.clicked ? 'clicked' : false, disabled ? 'disabled' : false]"
		:disabled="disabled"
		:type="type"
		@mousemove.self="onMouseMove"
		@mouseleave.self="onMouseLeave"
		@click="onClick"
	>
		<div ref="ripple" class="ripple-effect" />
		<div class="button-inner">
			<slot>
				{{ label }}
			</slot>
		</div>
	</button>
</template>
