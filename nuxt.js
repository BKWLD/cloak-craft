import { join } from 'path'
import {
	requireLate,
	requireOnce,
	setPublicDefaultOptions
} from '@cloak-app/utils'
export default function() {

	// Have Nuxt transpile resources
	this.options.build.transpile.push('@cloak-app/craft')

	// Set default options
	setPublicDefaultOptions(this, 'craft', {
		endpoint: process.env.CMS_ENDPOINT,
		site: process.env.CMS_SITE,
		pageTypenames: [],
	})

	// Add Axios module at the end so it can be used in the plugin
	requireLate(this, '@nuxtjs/axios')

	// Add the Craft plugin which creates the Craft instance of Axios. Not using
	// this.addPlugin so I don't have to deal with adding sub-imports via
	// addTemplate.
	this.options.plugins.unshift(join(__dirname, 'plugins/craft-client.js'))

	// Statically generate dynamic pages
	requireOnce(this, join(__dirname, './modules/generate-pages.js'))

	// Generate Netlify redirects
	if (process.env.NETLIFY) {
		requireOnce(this, join(__dirname, './modules/create-netlify-redirects.js'))
	}
}

// Required for published modules
module.exports.meta = require('./package.json')
