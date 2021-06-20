import lodash from 'lodash'

export module helpers {
	export interface AnyObject {
		[key: string]: any
	}

	export function is<This, What extends This>(
		what: What,
		this_is: This
	): this_is is What {
		return what === this_is
	}

	export function extract<T extends AnyObject, W extends Array<string>>(
		obj: T,
		what: W
	): Extract<T, W> {
		const data: any = {}

		for (const key of what) {
			const v = lodash.get(obj, key)
			if (typeof v !== 'undefined') lodash.set(data, key, v)
		}

		return data
	}

	export function exclude<T extends AnyObject, W extends Array<keyof T>>(
		o: T,
		w: W
	): Exclude<T, W> {
		const data: any = {}
		const keys = Object.keys(o) as W

		for (const k of keys) {
			if (!w.includes(k)) data[k] = o[k]
		}

		return data
	}
}

export default helpers
