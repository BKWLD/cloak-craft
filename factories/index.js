import makeClient from './craft-client-factory'
import axios from 'axios'

// Used passed in Axios instance or fallback to a node_modules instance.  The
// latter may be used when creating a client from another @cloak-app module.
export function makeCraftClient(options = {}) {
	return makeClient(options.axios || axios, options)
}
