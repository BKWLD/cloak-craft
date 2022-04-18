import consola from 'consola'
import { join } from 'path'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { makeCraftClientForModule } from '../factories'

/*
 * A Nuxt module that appends redirects that don't end in an anchor to the
 * _redirects file
*/
export default function() {

	// Make a consola scope
	const log = consola.withTag('@cloak-app/craft')

	// Wait until dist is copied
	this.nuxt.hook('generate:distCopied', async ({ options }) => {
		log.info('Adding server side redirects')

		// Fetch the server side redirects
		const $craft = makeCraftClientForModule(this),
			rules = await getRedirects($craft);

		// Open up _redirects
		const file = join(options.srcDir, 'dist/_redirects')
		let redirects = existsSync(file) ? readFileSync(file, 'utf8') : ''

		// Append rules
		rules.forEach(rule => {
			redirects += `\n${rule.from} ${rule.to} ${rule.code}!`
		})

		// Write file
		writeFileSync(file, redirects);
	})
};

// Fetch all the redirects from Craft
function getRedirects($craft) {
	return $craft.getEntries({
		query: `
			query getRedirects($site:[String]) {
				entries(type:'redirects', site:$site) {
					... on redirects_redirects_Entry {
						from: redirectFrom
						to: redirectTo
						code: redirectCode
					}
				}
			}
		`
	})
}
