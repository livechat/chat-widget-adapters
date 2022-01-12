import mitt from 'mitt'
import { nextTick } from 'vue'
import { createWidget, CustomerData } from '@livechat/widget-core'
import type { ExtendedWindow, WidgetInstance } from '@livechat/widget-core'

import { useWidgetCustomerData } from '../useWidgetCustomerData'
import { createHookValueContainer } from './test-utils'

declare const window: ExtendedWindow

describe('useWidgetCustomerData', () => {
	const emitter = mitt()
	let widget: WidgetInstance
	let container: ReturnType<typeof createHookValueContainer>
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
		container = createHookValueContainer(useWidgetCustomerData, document.getElementById('root') as HTMLElement)
		window.LiveChatWidget.on = window.LiveChatWidget.once = emitter.on.bind(null) as typeof window.LiveChatWidget.on

		container.mount()
		widget.init()
	})

	afterEach(() => {
		jest.clearAllMocks()
		widget.destroy()
	})

	it('should return `null` as default value', () => {
		const { getResultContent } = container

		expect(getResultContent()).toMatchInlineSnapshot(`"null"`)
	})

	it('should return `customerData` if widget is ready', async () => {
		const { getResultContent } = container

		emitter.emit('ready', { customerData })
		await nextTick()

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

	it('should return updated `customerData`', async () => {
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

		emitter.emit('customer_status_changed')
		await nextTick()

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

	it('should return `null` if widget was destroyed', async () => {
		const { getResultContent } = container

		widget.destroy()
		await nextTick()

		expect(getResultContent()).toMatchInlineSnapshot(`"null"`)
	})

	it('should cleanup event listeners on component unmount', async () => {
		const { unmount } = container
		const offSpy = jest.spyOn(window.LiveChatWidget, 'off')

		unmount()
		await nextTick()

		expect(offSpy).toBeCalled()
	})
})
