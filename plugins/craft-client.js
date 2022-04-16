/**
 * Create the Craft axios client instance
 */
import { makeCraftClient } from '../factories'
export default function({ $axios, $config }, inject) {
	inject('craft', makeCraftClient({
		...$config.cloak.craft,
		axios: $axios,
	}))
}
