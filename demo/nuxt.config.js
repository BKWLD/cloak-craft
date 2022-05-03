import { addPluginAfter } from '@cloak-app/utils'
import { makeCraftMock } from './plugins/mock-craft'

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

		// Generate test pages
		craft: {
			pageTypenames: [ 'towers_tower_Entry' ],
		},
	},

	// Make a mock that is used in nuxt hooks of this module
	craftMock: makeCraftMock(),

	// Load plugin that mocks runtime craft data
	extendPlugins(plugins) {
		return addPluginAfter(plugins, 'craft-client', '~/plugins/mock-craft')
	}
}
