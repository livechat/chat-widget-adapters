import mitt from 'mitt'
import { nextTick } from 'vue'
import { createWidget, Greeting } from '@livechat/widget-core'
import type { ExtendedWindow, WidgetInstance } from '@livechat/widget-core'

import { useWidgetGreeting } from '../useWidgetGreeting'
import { createHookValueContainer } from './test-utils'

declare const window: ExtendedWindow

describe('useWidgetGreeting', () => {
	const emitter = mitt()
	let widget: WidgetInstance
	let container: ReturnType<typeof createHookValueContainer>
	const greeting: Greeting = {
		id: 1,
		uniqueId: 'abcdef',
	}

	beforeEach(() => {
		document.body.innerHTML = '<div id="root"></div>'
		widget = createWidget({ license: '123456' })
		container = createHookValueContainer(useWidgetGreeting, document.getElementById('root') as HTMLElement)
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

	it('should return `greeting` when it is displayed', async () => {
		const { getResultContent } = container

		emitter.emit('greeting_displayed', greeting)
		await nextTick()

		expect(getResultContent()).toMatchInlineSnapshot(`
		"{
		  \\"id\\": 1,
		  \\"uniqueId\\": \\"abcdef\\"
		}"
	`)
	})

	it('should return `null` if greeting was hidden', async () => {
		const { getResultContent } = container

		emitter.emit('greeting_hidden')
		await nextTick()

		expect(getResultContent()).toMatchInlineSnapshot(`"null"`)
	})

	it('should return `null` if widget was destroyed', async () => {
		const { getResultContent } = container

		widget?.destroy()
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
