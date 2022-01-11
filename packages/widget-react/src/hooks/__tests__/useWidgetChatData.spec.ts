import { act } from 'react-dom/test-utils'
import { createWidget, CustomerData } from '@livechat/widget-core'
import type { ExtendedWindow, WidgetInstance } from '@livechat/widget-core'

import { useWidgetChatData } from '../useWidgetChatData'
import { createDispatcher, createHookValueContainer } from './test-utils'

declare const window: ExtendedWindow

describe('React Hooks', () => {
	let widget: WidgetInstance
	let container: ReturnType<typeof createHookValueContainer>
	const { setListener, dispatch } = createDispatcher()

	beforeEach(() => {
		document.body.innerHTML = '<div id="root"></div>'
		widget = createWidget({ license: '123456' })
		container = createHookValueContainer(useWidgetChatData, document.getElementById('root'))
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

	it('should return updated `chatData` if customer is chatting', () => {
		const { getResultContent } = container
		jest.spyOn(window.LiveChatWidget, 'get').mockImplementation(((name) => {
			if (name === 'customer_data') {
				return { status: 'chatting' }
			}
			if (name === 'chat_data') {
				return {
					chatId: 'abcdef',
					threadId: 'ghijkl',
				}
			}
		}) as typeof window.LiveChatWidget.get)

		act(() => {
			dispatch('customer_status_changed')
		})
		expect(getResultContent()).toMatchInlineSnapshot(`
		"{
		  \\"chatId\\": \\"abcdef\\",
		  \\"threadId\\": \\"ghijkl\\"
		}"
	`)
	})

	it('should return `null` if customer is not chatting', () => {
		const { getResultContent } = container
		jest.spyOn(window.LiveChatWidget, 'get').mockImplementation((): CustomerData => {
			return { status: 'browsing' } as CustomerData
		})

		act(() => {
			dispatch('customer_status_changed')
		})

		expect(getResultContent()).toMatchInlineSnapshot(`"null"`)
	})
})
