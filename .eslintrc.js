module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	extends: [
		'@nuxtjs/eslint-config-typescript',
		'plugin:prettier/recommended',
		'plugin:nuxt/recommended'
	],
	plugins: [],
	// add your custom rules here
	rules: {
		'no-console': 'off',
		camelcase: 'off',
		'import/no-mutable-exports': 'off',
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'vue/no-v-html': 'off',
		'no-case-declarations': 'off'
	}
}
