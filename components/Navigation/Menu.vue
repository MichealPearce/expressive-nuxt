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
	<section class="navigation menu">
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
	</section>
</template>

<style lang="scss" scoped>
@import '@sassy';
</style>
