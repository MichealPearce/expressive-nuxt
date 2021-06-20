<script lang="ts">
import { menus } from '@store'
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class NavigationMenu extends Vue {
	@Prop({ type: [String, Array], required: true })
	menu!: string | any[]

	get menu_items() {
		if (Array.isArray(this.menu)) return this.menu
		return menus.areas[this.menu]?.items
	}

	fetch() {
		if (Array.isArray(this.menu)) return
		return menus.fetch(this.menu)
	}
}
</script>

<template>
	<transition-group name="menu-item" tag="section" class="navigation menu">
		<template v-for="item in menu_items">
			<navigation-item
				v-if="!item.children"
				:key="item.url"
				class="navigation item"
				:item="item"
			/>
			<section v-else :key="item.url" class="sub-menu">
				<h5 v-if="item.title" class="title">{{ item.title }}</h5>
				<navigation-item
					v-for="subitem in item.children"
					:key="subitem.url"
					class="navigation item"
					:item="subitem"
				/>
			</section>
		</template>
	</transition-group>
</template>

<style lang="scss" scoped>
@import '@sassy';

.menu-item-move {
	transition: transform 0.8s ease;
}

.navigation.item {
	opacity: 1;

	&.menu-item-enter-active,
	&.menu-item-leave-active {
		opacity: 0;
		transition: all 0.8s ease;
	}

	&.menu-item-enter-active,
	&.menu-item-enter-to,
	&.menu-item-enter-from,
	&.menu-item-leave-from,
	&.menu-item-leave-to {
		opacity: 0;
		margin-left: -100%;
	}
}
</style>
