import { act } from 'react-dom/test-utils'
import { createWidget, CustomerData } from '@livechat/widget-core'
import type { ExtendedWindow, WidgetInstance } from '@livechat/widget-core'

import { useWidgetCustomerData } from '../useWidgetCustomerData'
import { createDispatcher, createHookValueContainer } from './test-utils'

declare const window: ExtendedWindow

describe('useWidgetCustomerData', () => {
	let widget: WidgetInstance
	let container: ReturnType<typeof createHookValueContainer>
	const { setListener, dispatch } = createDispatcher()
	const customerData: CustomerData = {
		id: 'abcdefg',
		name: 'John Doe',
		email: 'john.doe@example.com',
		isReturning: false,
		status: 'browsing',
		sessionVariables: {},
	}

	beforeEach(() => {
		document.body.innerHTML = '<div id="root"></div>'
		widget = createWidget({ license: '123456' })
		container = createHookValueContainer(useWidgetCustomerData, document.getElementById('root'))
		window.LiveChatWidget.on = window.LiveChatWidget.once = setListener as typeof window.LiveChatWidget.on

		act(() => {
			container.mount()
			widget.init()
		})
	})

	afterEach(() => {
		jest.clearAllMocks()
		act(() => {
			widget.destroy()
		})
	})

	it('should return `null` as default value', () => {
		const { getResultContent } = container

		expect(getResultContent()).toMatchInlineSnapshot(`"null"`)
	})

	it('should return `customerData` if widget is ready', () => {
		const { getResultContent } = container

		act(() => {
			dispatch('ready', { customerData })
		})
		expect(getResultContent()).toMatchInlineSnapshot(`
		"{
		  \\"id\\": \\"abcdefg\\",
		  \\"name\\": \\"John Doe\\",
		  \\"email\\": \\"john.doe@example.com\\",
		  \\"isReturning\\": false,
		  \\"status\\": \\"browsing\\",
		  \\"sessionVariables\\": {}
		}"
	`)
	})

	it('should return updated `customerData`', () => {
		const { getResultContent } = container
		jest.spyOn(window.LiveChatWidget, 'get').mockImplementation((): CustomerData => {
			return {
				...customerData,
				status: 'chatting',
				sessionVariables: {
					foo: 'bar',
				},
			}
		})

		act(() => {
			dispatch('customer_status_changed')
		})
		expect(getResultContent()).toMatchInlineSnapshot(`
		"{
		  \\"id\\": \\"abcdefg\\",
		  \\"name\\": \\"John Doe\\",
		  \\"email\\": \\"john.doe@example.com\\",
		  \\"isReturning\\": false,
		  \\"status\\": \\"chatting\\",
		  \\"sessionVariables\\": {
		    \\"foo\\": \\"bar\\"
		  }
		}"
	`)
	})

	it('should return `null` if widget was destroyed', () => {
		const { getResultContent } = container

		act(() => {
			widget.destroy()
		})
		expect(getResultContent()).toMatchInlineSnapshot(`"null"`)
	})

	it('should cleanup event listeners on component unmount', () => {
		const { unmount } = container

		const offSpy = jest.spyOn(window.LiveChatWidget, 'off')
		act(() => {
			unmount()
		})
		expect(offSpy).toBeCalled()
	})
})
