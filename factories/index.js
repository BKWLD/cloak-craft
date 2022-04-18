import makeClient from './craft-client-factory'
import axios from 'axios'

// Used passed in Axios instance or fallback to a node_modules instance.  The
// latter may be used when creating a client from another @cloak-app module.
export function makeCraftClient(options = {}) {
	return makeClient(options.axios || axios, options)
}

// Helper to make a Craft client when in the context of a Nuxt module,
// supporting the optional persence of a mock.  This is necessary because,
// when a module runs, the injected plugin instance of $craft isn't ready yet.
export function makeModuleCraftClient(moduleContainer) {
	const craftOptions = moduleContainer.options.cloak.craft
	return moduleContainer.options.craftMock || makeCraftClient(craftOptions)
}
