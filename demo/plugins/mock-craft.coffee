###
Mock Axios calls to Craft API
###
import MockAdapter from 'axios-mock-adapter'

# Get stubs
import towerList from '../stubs/tower-list.json'

# Use mocked data unless an endpoint is defined
export default ({ $craft, $config }) ->
	return if $config.cloak.craft.endpoint

	# Make the mock
	axiosMock = new MockAdapter $craft
	axiosMock.onAny().reply(200, towerList) # Only one ATM
