import { join } from 'path'
import { requireOnce, setPublicDefaultOptions } from '@cloak-app/utils'
export default function() {

	// Have Nuxt transpile resources
	this.options.build.transpile.push('@cloak-app/craft')

	// Set default options
	setPublicDefaultOptions(this, 'craft', {
		endpoint: process.env.CMS_ENDPOINT,
		site: process.env.CMS_SITE,
	})

	// Add Axios module at the end so it can be used in the plugin
	this.nuxt.hook('modules:done', moduleContainer => {
		requireOnce(moduleContainer, '@nuxtjs/axios')
	})

	// Add the Craft plugin which creates the Craft instance of Axios. Not using
	// this.addPlugin so I don't have to deal with adding sub-imports via
	// addTemplate.
	this.options.plugins.unshift(join(__dirname, 'plugins/craft.js'))
}

// Required for published modules
module.exports.meta = require('./package.json')
