import Model, { ModelData } from '@database/Model'
import { Column, Entity, Index, PrimaryColumn } from 'typeorm'

export interface UserData extends ModelData {
	name: string
	email: string
	password?: string
}

@Entity({
	name: 'sa_users'
})
export default class User extends Model<UserData> {
	@Column('varchar', { length: 25, unique: true })
	name: string

	@Column('varchar', { length: 50, unique: true })
	email: string

	@Column('varchar', { select: false })
	password?: string

	getIndex() {
		return ['id', 'name', 'email']
	}

	getRepository() {
		return User.getRepository()
	}
}
