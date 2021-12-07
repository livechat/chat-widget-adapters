import { createJSApi } from '../create-js-api'
import { getData } from '../get-data'
import type { ExtendedWindow } from '../types'

declare const window: ExtendedWindow

describe('getData', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})
	const dataTypes = ['state', 'chat', 'customer'] as const
	const expected = {
		state: 'state',
		chat: 'chat_data',
		customer: 'customer_data',
	} as const

	dataTypes.forEach((type) => {
		it(`should handle ${type} data`, () => {
			createJSApi()
			const spy = jest.fn()
			Object.defineProperty(window.LiveChatWidget, 'get', { value: spy })

			getData(type as any)
			expect(spy).toBeCalledWith(expected[type])
		})
	})

	it('should return null for unsuported data type', () => {
		expect(getData(undefined as any)).toBeNull()
	})
})
