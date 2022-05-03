// Mock stubs
import pageEntriesToGenerate from './stubs/page-entries-to-generate.json'
import towerExample1 from './stubs/towers/example-1.json'
import towerExample2 from './stubs/towers/example-2.json'
import redirects from './stubs/redirects.json'

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
			mocks: [
				{
					query: 'getPageEntriesToGenerate',
					response: pageEntriesToGenerate,
				},
				{
					query: 'getTower',
					variables: { uri: 'example-1' },
					response: towerExample1,
				},
				{
					query: 'getTower',
					variables: { uri: 'example-2' },
					response: towerExample2,
				},
				{
					query: 'getRedirects',
					response: redirects,
				}
			]
		},
	},
}
