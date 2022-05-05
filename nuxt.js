import { join } from 'path'
import {
	requireLate,
	requireOnce,
	setDefaultOptions,
	setPublicDefaultOptions
} from '@cloak-app/utils'
export default function() {

	// Have Nuxt transpile resources
	this.options.build.transpile.push('@cloak-app/craft')

	// Set default non-exposed options
	setDefaultOptions(this, 'craft', {
		generateRedirects: false,
		pageTypenames: [],
		injectClient: true,
	})

	// Set default options
	setPublicDefaultOptions(this, 'craft', {
		endpoint: process.env.CMS_ENDPOINT,
		site: process.env.CMS_SITE,
		mocks: [],
	})

	// Enable the generate fallback. This is done so that Craft's preview system
	// will work on pages that haven't been statically generate yet, aka new
	// pages.
	this.options.generate.fallback = '404.html'

	// Add Axios module at the end so it can be used in the plugin
	requireLate(this, '@nuxtjs/axios')

	// Add the Craft plugin which creates the Craft instance of Axios. Not using
	// this.addPlugin so I don't have to deal with adding sub-imports via
	// addTemplate.
	if (this.options.cloak.craft.injectClient) {
		this.options.plugins.unshift(join(__dirname, 'plugins/craft-client.js'))
	}

	// Support mocking
	requireOnce(this, join(__dirname, './modules/mock-craft.js'))

	// Statically generate dynamic pages
	requireOnce(this, join(__dirname, './modules/generate-pages.js'))

	// Generate Netlify redirects
	if (process.env.NETLIFY && this.options.cloak.craft.generateRedirects) {
		requireOnce(this, join(__dirname, './modules/create-netlify-redirects.js'))
	}
}

// Required for published modules
module.exports.meta = require('./package.json')
