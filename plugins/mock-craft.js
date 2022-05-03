/*
 * Mock runtime Craft instances. Using explicit import so we don't try to load
 * Node deps
 */
import { mockAxiosGql } from '@cloak-app/utils/src/axios'
export default function({ $config, $craft }) {
	mockAxiosGql($craft, $config.cloak.craft.mocks)
}
