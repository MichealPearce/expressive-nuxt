import Model, { ModelData } from '@database/Model'
import { Column, Entity } from 'typeorm'

export interface MenuData extends ModelData {
	slug: string
	name: string
}

@Entity({
	name: 'sa_menus'
})
export default class Menu extends Model<MenuData> {
	@Column('varchar', { length: 50 })
	slug: string

	@Column('varchar', { length: 50 })
	name: string

	@Column('json', { nullable: true })
	items: any[]

	getRepository() {
		return Menu.getRepository()
	}
}
