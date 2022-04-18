import consola from 'consola'
import { makeModuleCraftClient } from '../factories'
import defaultsDeep from 'lodash/defaultsDeep'

/**
 * Module that added dynamic pages (like towers) to the generated routes
 */
export default function() {

	// Make a consola scope
	const log = consola.withTag('@cloak-app/craft')

	// Create noindex property in sitemap options in case this loads first
	defaultsDeep(this.options, { sitemap: { routes: [] }})

	// Adding routes
	this.nuxt.hook('generate:extendRoutes', async routes => {

		// Log starting
		const pageTypenames = this.options.cloak.craft.pageTypenames
		if (!pageTypenames.length) return
		log.info(`Adding SSG routes for ${pageTypenames.length} pageTypenames`)

		// Get an array of URIs and robots rules of all pages to be generated
		const $craft = makeModuleCraftClient(this),
			entries = (await Promise.all(
				pageTypenames.map(typename => {
					return getEntriesForType($craft, typename)
				})
			)).flat()

		// Loop through the entries
		entries.forEach(entry => {

			// Add routes to the list that should be generated
			const route = entry.uri == '__home__' ? '/' : `/${entry.uri}`
			routes.push({ route })

			// Add routes without noindex to @nuxtjs/sitemap
			const robots = entry.seo?.[0]?.robots || entry.robots || []
			if (!robots.includes('noindex')) this.options.sitemap.routes.push(route)
		})

		// All done
		log.info(`Added SSG routes`)
	})
}

// Get just the uri and robots for a pageTypenameName
function getEntriesForType($craft, typename) {
	return $craft.getEntries({
		variables: parseTypename(typename),
		query: `
			query getPageEntriesToGenerate(
				$section:[String]
				$type:[String]
				$site:[String]) {
				entries(section:$section, type:$type, site:$site) {
					uri
					robots
					seo { robots } # If using SuperTable
				}
			}
		`
	})
}

// Make the query parts for a typename
function parseTypename(typename) {
	const [ section, type ] = typename.split('_')
	return { section, type }
}
