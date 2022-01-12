import mitt from 'mitt'
import { nextTick } from 'vue'
import { createWidget, CustomerData } from '@livechat/widget-core'
import type { ExtendedWindow, WidgetInstance } from '@livechat/widget-core'

import { useWidgetChatData } from '../useWidgetChatData'
import { createHookValueContainer } from './test-utils'

declare const window: ExtendedWindow

describe('React Hooks', () => {
	const emitter = mitt()
	let widget: WidgetInstance
	let container: ReturnType<typeof createHookValueContainer>

	beforeEach(() => {
		document.body.innerHTML = '<div id="root"></div>'
		widget = createWidget({ license: '123456' })
		container = createHookValueContainer(useWidgetChatData, document.getElementById('root') as HTMLElement)
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

	it('should return updated `chatData` if customer is chatting', async () => {
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

		emitter.emit('customer_status_changed')
		await nextTick()

		expect(getResultContent()).toMatchInlineSnapshot(`
		"{
		  \\"chatId\\": \\"abcdef\\",
		  \\"threadId\\": \\"ghijkl\\"
		}"
	`)
	})

	it('should return `null` if customer is not chatting', async () => {
		const { getResultContent } = container
		jest.spyOn(window.LiveChatWidget, 'get').mockImplementation((): CustomerData => {
			return { status: 'browsing' } as CustomerData
		})

		emitter.emit('customer_status_changed')
		await nextTick()

		expect(getResultContent()).toMatchInlineSnapshot(`"null"`)
	})
})
