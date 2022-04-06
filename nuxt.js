import { join } from 'path'
export default function() {

	// Have Nuxt transpile resources
	this.options.build.transpile.push('@cloak-app/craft')

	// Set default options
	this.options.cloak = {
		...this.options.cloak,
		craft: {
			endpoint: process.env.CMS_ENDPOINT,
			site: process.env.CMS_SITE,
			...this.options.cloak?.craft,
		}
	}

	// Relay package options to runtime config
	this.options.publicRuntimeConfig.cloak = {
		...this.options.publicRuntimeConfig.cloak,
		craft: this.options.cloak.craft,
	}

	// Add Axios module at the end so it can be used in the plugin
	this.nuxt.hook('modules:done', moduleContainer => {
		moduleContainer.requireModule('@nuxtjs/axios')
	})

	// Add the Craft plugin which creates the Craft instance of Axios
	this.addPlugin({
		src: join(__dirname, 'plugins/craft.js')
	})
}

// Required for published modules
module.exports.meta = require('./package.json')
