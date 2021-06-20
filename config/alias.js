import path from 'path'
const rootDir = path.resolve(__dirname, '..')
const folders = [
	'assets',
	'components',
	'includes',
	'layouts',
	'middleware',
	'pages',
	'plugins',
	'static',
	'store',
	'typings',
	'config',
	'server'
]
const aliases = {}

folders.forEach(folder => {
	aliases['@' + folder] = path.resolve(rootDir, folder)
})

aliases['@styles'] = path.resolve(rootDir, 'assets/styles')
aliases['@sassy'] = path.resolve(rootDir, 'assets/styles/_sassy.scss')

export default aliases
