import { assignCustomerData } from '../assign-customere-data'
import { createJSApi } from '../create-js-api'
import type { ExtendedWindow } from '../types'

declare const window: ExtendedWindow

describe('assignCustomerData', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('should handle proper customer data', () => {
		createJSApi()
		const spy = jest.spyOn(window.LiveChatWidget, 'call')

		assignCustomerData({
			name: 'John Doe',
			email: 'john.doe@example.com',
		})

		expect(spy.mock.calls).toMatchInlineSnapshot(`
		Array [
		  Array [
		    "set_customer_name",
		    "John Doe",
		  ],
		  Array [
		    "set_customer_email",
		    "john.doe@example.com",
		  ],
		]
	`)
	})

	it('should not call change for empty data object', () => {
		createJSApi()
		const spy = jest.spyOn(window.LiveChatWidget, 'call')

		assignCustomerData({})

		expect(spy).not.toBeCalled()
	})
})
