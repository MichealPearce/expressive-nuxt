import Model from '@database/Model'
import { MenuData } from '@includes/interfaces'
import { Column, Entity } from 'typeorm'

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
