import { nextTick } from 'vue'
import mitt from 'mitt'
import { createWidget, ExtendedWindow, WidgetInstance } from '@livechat/widget-core'

import { useWidgetIsReady } from '../useWidgetIsReady'
import { createHookValueContainer } from './test-utils'

declare const window: ExtendedWindow

describe('useWidgetIsReady', () => {
	const emitter = mitt()
	let widget: WidgetInstance
	let container: ReturnType<typeof createHookValueContainer>

	beforeEach(() => {
		document.body.innerHTML = '<div id="root"></div>'
		widget = createWidget({ license: '123456' })
		container = createHookValueContainer(useWidgetIsReady, document.getElementById('root') as HTMLElement)
		window.LiveChatWidget.on = window.LiveChatWidget.once = emitter.on.bind(null) as typeof window.LiveChatWidget.on

		container.mount()
		widget.init()
	})

	afterEach(() => {
		jest.clearAllMocks()
		widget.destroy()
	})

	it('should return `false` as default value', () => {
		const { getResultContent } = container

		expect(getResultContent()).toMatchInlineSnapshot(`"false"`)
	})

	it('should return `true` if widget is ready', async () => {
		const { getResultContent } = container

		emitter.emit('ready')
		await nextTick()

		expect(getResultContent()).toMatchInlineSnapshot(`"true"`)
	})

	it('should return `false` if widget was destroyed', async () => {
		const { getResultContent } = container

		widget?.destroy()
		await nextTick()

		expect(getResultContent()).toMatchInlineSnapshot(`"false"`)
	})

	it('should cleanup event listeners on component unmount', async () => {
		const { unmount } = container
		const offSpy = jest.spyOn(window.LiveChatWidget, 'off')

		unmount()
		await nextTick()

		expect(offSpy).toBeCalled()
	})
})
