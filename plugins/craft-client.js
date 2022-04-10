/**
 * Create the Craft axios client instance
 */
import { makeCraftClient } from '../factories'
export default function({ $axios, $config }, inject) {
	inject('craft', makeCraftClient($axios, $config.cloak.craft))
}
