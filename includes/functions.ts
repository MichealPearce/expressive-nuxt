import fs from 'fs'
import path from 'path'
import { Router, Application } from 'express'

export function loadAPIRoutes(router: Router | Application, p: string[]) {
	p.forEach(route_path => {
		const route: Router = require(`@api/${route_path}`).default
		if (!route) return
		console.info(`loading @api/${route_path}`)
		router.use(route)
	})
}

export function slugIt(what: string) {
	return require('slugify')(what, {
		lower: true,
		strict: true
	})
}

export function getTemplate(p: string, params?: Record<string, string>) {
	if (!p.endsWith('.html')) p = p + '.html'
	const templatePath = path.join(global.app_root, 'templates', p)

	let template = fs.readFileSync(templatePath).toString()
	if (!params) return template

	for (const key of Object.keys(params)) {
		const replace = `{{${key}}}`
		template = template.replace(new RegExp(replace, 'g'), params[key])
	}

	return template
}
