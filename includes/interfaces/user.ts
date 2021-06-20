import { ModelData } from './model'

export interface UserData extends ModelData {
	name: string
	email: string
	password?: string
}
