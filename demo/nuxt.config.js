import { addPluginAfter } from '@cloak-app/utils'

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

	// Load plugin that mocks Craft data
	extendPlugins(plugins) {
		return addPluginAfter(plugins, 'craft-client', '~/plugins/mock-craft')
	}
}
