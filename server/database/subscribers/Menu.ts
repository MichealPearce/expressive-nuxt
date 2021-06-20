import Menu from '@database/models/Menu'
import { slugIt } from '@includes/functions'
import {
	EntitySubscriberInterface,
	EventSubscriber,
	InsertEvent,
	UpdateEvent
} from 'typeorm'

@EventSubscriber()
export class MenuSubscriber implements EntitySubscriberInterface<Menu> {
	check(event: InsertEvent<Menu> | UpdateEvent<Menu>) {
		const menu = event.entity
		menu.slug = slugIt(menu.name)
		if (!menu.items) menu.items = []
	}

	beforeInsert(event: InsertEvent<Menu>) {
		this.check(event)
	}

	beforeUpdate(event: UpdateEvent<Menu>) {
		this.check(event)
	}
}
