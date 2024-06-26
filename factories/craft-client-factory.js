import pickBy from 'lodash/pickBy'

// Factory method for making Craft Axios clients
export default function (axios, {
	endpoint, site, query, payloadTransformers
} = {}) {

	// Make empty array if not defined
	if (!payloadTransformers) payloadTransformers = []

	// Make Craft instance
	const craft = axios.create({
		baseURL: endpoint,
		headers: {
			'Content-Type': 'application/json',
		},
	})

	// Add execute helper for running gql queries
	craft.execute = async payload => {

		// Transform the request
		payload = cleanEmptyArrays(payload)
		payload = restrictToSite(payload, site)
		payloadTransformers.forEach(transformer => {
			payload = transformer(payload)
		})

		// Execute the query
		const response = await craft({
			method: 'POST',
			data: payload,
			params: getCraftPreviewTokens(query),
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

	// Update the site variable
	craft.setSite = (newSite) => site = newSite

	// Add custom payload transformer
	craft.addPayloadTransformer = (callback) => {
		payloadTransformers.push(callback)
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
export function getCraftPreviewTokens(nuxtQuery) {

	// Use query object as source if provided.
	if (nuxtQuery && nuxtQuery.token) return { token: nuxtQuery.token }

	// Else, use the window
	if (typeof window === 'undefined') return
	const searchParams = (new URL(window.location.href)).searchParams
	if (!searchParams) return
	return { token: searchParams.get('token') }
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
