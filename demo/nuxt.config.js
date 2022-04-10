// Nuxt config
export default {

	// Load boilerplate and this package's module
	buildModules: [
		'@cloak-app/boilerplate',
		'@cloak-app/demo-theme',
	],
	modules: [
		'../nuxt',
		'@nuxt/content', // Can't be loaded from module
	],

	// Cloak settings
	cloak: {

		// Boilerplate settings
		boilerplate: {
			siteName: '@cloak-app/craft demo',
		},

	},

	// Load plugin that mocks Craft data and inject it right after the
	// @cloak-app/craft plugin. This was necessary to ensure that we're mocking
	// before the fetch-translations.coffee.
	extendPlugins(plugins) {
		const craftPluginIndex = plugins.findIndex(
			plugin => (plugin.src || plugin).includes('craft.js')
		)
		plugins.splice(craftPluginIndex + 1, 0, '~/plugins/mock-craft')
		return plugins
	}
}
