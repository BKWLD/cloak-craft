/**
 * Create the Craft axios client instance
 */
import { makeCraftClient } from '../factories'
export default function({ $axios, $config, query }, inject) {
	inject('craft', makeCraftClient({
		...$config.cloak.craft,
		query,
		axios: $axios,
	}))
}
