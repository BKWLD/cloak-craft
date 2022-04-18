/*
 * Mock Axios calls to Craft API
 */
import MockAdapter from 'axios-mock-adapter'
import { makeCraftClient } from '../../factories'

// Get stubs
import pageEntriesToGenerate from '../stubs/page-entries-to-generate.json'
import towerExample1 from '../stubs/towers/example-1.json'
import towerExample2 from '../stubs/towers/example-2.json'
import redirects from '../stubs/redirects.json'

// Nuxt plugin
export default function ({ $craft }) {
	addMocks($craft)
}

// Make a new Craft instance with mocks
export function makeCraftMock() {
	const $craft = makeCraftClient()
	addMocks($craft)
	return $craft
}

// Add mock to axios instances
export function addMocks(client) {

	// Make mock instance
	const mock = new MockAdapter(client)

	// Listen to all requests...
	mock.onAny().reply(config => {
		const payload = JSON.parse(config.data)

		// Return a json stub based on request vars
		if (payload.query.includes('getPageEntriesToGenerate')) {
			return [200, pageEntriesToGenerate]
		} else if (payload.query.includes('getTower')) {
			if (payload.variables.uri == 'example-1') {
				return [200, towerExample1]
			} else if (payload.variables.uri == 'example-2') {
				return [200, towerExample2]
			}
		} else if (payload.query.includes('getRedirects')) {
			return [200, redirects]
		}

		// A request didn't match expectations
		throw 'Unexepcted request'
	})
}
