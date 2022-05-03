/*
 * Add support for Mocking the Craft instance
 */
import { join } from 'path'
import { makeCraftClient } from '../factories'
import { mockAxiosGql } from '@cloak-app/utils'
export default function() {

	// Abort unless the mock options have been set
	const { mocks } = this.options.cloak.craft
	if (!mocks.length) return

	// Make the Craft mock and store it on options for use by
	// makeModuleCraftClient()
	const $craft = makeCraftClient()
	mockAxiosGql($craft, mocks)
	this.options.craftMock = $craft

	// Mock runtime Craft instances, adding after craft-client
	this.options.plugins.push(join(__dirname, '../plugins/mock-craft.js'))
}
