import consola from 'consola'
import { makeCraftClient } from '../factories'

/**
 * Module that added dynamic pages (like towers) to the generated routes
 */
export default function() {

	// Make a consola scope
	const log = consola.withTag('@cloak-app/craft')

	// Adding routes
	this.nuxt.hook('generate:extendRoutes', async routes => {

		// Log starting
		const craftOptions = this.options.cloak.craft,
			pageTypenames = craftOptions.pageTypenames
		if (!pageTypenames.length) return
		log.info(`Adding SSG routes for ${pageTypenames.length} pageTypenames`)

		// Make Craft client (we don't have access to the plugin created one)
		const $craft = this.options.craftMock || makeCraftClient(craftOptions)

		// Make an array of the URIs and robots rules of all pages to be generated
		const entries = (await Promise.all(pageTypenames.map(typename => {
			return getEntriesForType($craft, typename)
		}))).flat()

		// Add routes to the list that should be generated
		entries.forEach(entry => {
			const route = entry.uri == '__home__' ? '/' : `/${entry.uri}`
			routes.push({ route })
		})

		// Add noindex routes to @nuxtjs/sitemap's exclusion list

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
