import _ from 'lodash'
import {
	BaseEntity,
	ColumnOptions,
	CreateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	Repository,
	SaveOptions,
	UpdateDateColumn
} from 'typeorm'
import moment, { Moment, isMoment } from 'moment-timezone'
import helpers from '@includes/helpers'
import { ModelData } from '@includes/interfaces'

export const ModelDateTimeUTCTransformer = {
	to: v => {
		if (v && isMoment(v)) {
			return v.toDate()
		}
		return v
	},
	from: v => (v ? moment.utc(v) : v)
}

export const ModelDateTimeUNIXTransformer = {
	to: v => {
		if (v && isMoment(v)) {
			return v.toDate()
		}
		return v
	},
	from: v => (v ? moment.unix(v).utc() : v)
}

export default abstract class Model<
	Data extends ModelData = ModelData
> extends BaseEntity {
	abstract getRepository(): Repository<any>

	@PrimaryGeneratedColumn()
	id: number

	@CreateDateColumn(Model.DateTime)
	created?: Moment

	@UpdateDateColumn(Model.DateTime)
	updated?: Moment

	@DeleteDateColumn(Model.DateTime)
	deleted?: Moment

	static get DateTime(): ColumnOptions {
		return {
			type: 'datetime',
			transformer: ModelDateTimeUTCTransformer
		}
	}

	constructor(data?: Partial<Data>) {
		super()
		if (data) this.assign(data)
	}

	getIndex() {
		return ['id']
	}

	assign(data: Partial<Data>): this {
		return _.defaultsDeep(this, data)
	}

	load() {
		const indexes = helpers.extract(this, this.getIndex())
		if (!Object.values(indexes).length)
			return Promise.reject(new Error('model load rejected: no indexes provided'))
		return this.getRepository()
			.findOneOrFail({ where: indexes })
			.then(data => this.assign(data))
	}

	save(opts?: SaveOptions) {
		return super.save(opts).then(() => this.load())
	}
}
