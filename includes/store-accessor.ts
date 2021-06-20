/* eslint-disable import/no-mutable-exports */
import { Auth } from '@store/auth'
import { Layout } from '@store/layout'
import { Menus } from '@store/menus'
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'

let auth: Auth.Module
let layout: Layout.Module
let menus: Menus.Module

function initialiseStores(store: Store<any>): void {
	auth = getModule(Auth.Module, store)
	layout = getModule(Layout.Module, store)
	menus = getModule(Menus.Module, store)
}

export { initialiseStores, layout, menus, auth }
