import pickBy from 'lodash/pickBy'

/**
 * Create the Craft axios client instance
 */
export default function({ $axios, $config }, inject) {
	inject('craft', makeCraftClient($axios, $config.cloak.craft))
}

// Factory method for making Craft Axios clients
export function makeCraftClient(axios, { endpoint, site } = {}) {

	// Make Craft instance
	const craft = axios.create()
	craft.setBaseURL(endpoint)
	craft.setHeader('Content-Type', 'application/json')

	// Add execute helper for running gql queries
	craft.execute = async payload => {

		// Massage the request
		payload = cleanEmptyArrays(payload)
		payload = restrictToSite(payload, site)

		// Execute the query
		const response = await craft({
			method: 'POST',
			data: payload,
			params: getCraftPreviewTokens(),
		})

		// Handle errors in response
		if (response.data.errors) {
			throw new CraftError(response.data.errors, payload)
		}

		// Return data
		return response.data.data
	}

	// Get a list of entries
	craft.getEntries = async payload => {
		return (await craft.execute(payload)).entries
	}

	// Get a single entry
	craft.getEntry = async payload => {
		return (await craft.execute(payload)).entry
	}

	// Return the client
	return craft
}

// Remove empty arrays from variables, which Craft treats as an explicit
// requirement.  Like having no tags, which is something I don't think we
// care about.
export function cleanEmptyArrays(payload) {
	if (!payload.variables) return payload
	payload.variables = pickBy(payload.variables, val => {
		if (Array.isArray(val) && val.length === 0) return false
		return true
	})
	return payload
}

// Restrict the query to a specific site, if one is defined
export function restrictToSite(payload, site) {
	if (!site) return payload
	return {
		...payload,
		variables: {
			site,
			...(payload.variables || {})
		}
	}
}

// Get Craft preview tokens from the location
export function getCraftPreviewTokens() {
	if (typeof window === 'undefined') return
	const query = (new URL(window.location.href)).searchParams
	if (!query) return
	return { token: query.get('token') }
}

// Make a custom erorr object
export class CraftError extends Error {
	constructor(errors, payload) {

		// Use the Craft reponse errors as the error message string
		super(errors.map(function(e) {
			return e.debugMessage || e.message
		}).join(', '))

		// Also store the errors as an array
		this.errors = errors.map(function(e) {
			return JSON.stringify(e)
		})

		// Store the request payload
		this.payload = payload
	}
}
