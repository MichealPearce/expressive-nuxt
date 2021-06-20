import { Moment } from 'moment-timezone'

export interface ModelData {
	id?: number
	created?: Moment
	updated?: Moment
	deleted?: Moment
}
