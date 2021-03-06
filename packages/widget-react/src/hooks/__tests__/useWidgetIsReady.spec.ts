import mitt from 'mitt'
import { act } from 'react-dom/test-utils'
import { createWidget } from '@livechat/widget-core'
import type { ExtendedWindow, WidgetInstance } from '@livechat/widget-core'

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
		container = createHookValueContainer(useWidgetIsReady, document.getElementById('root'))
		window.LiveChatWidget.on = window.LiveChatWidget.once = emitter.on.bind(null) as typeof window.LiveChatWidget.on

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

	it('should return `false` as default value', () => {
		const { getResultContent } = container

		expect(getResultContent()).toMatchInlineSnapshot(`"false"`)
	})

	it('should return `true` if widget is ready', () => {
		const { getResultContent } = container

		act(() => {
			emitter.emit('ready')
		})

		expect(getResultContent()).toMatchInlineSnapshot(`"true"`)
	})

	it('should return `false` if widget was destroyed', () => {
		const { getResultContent } = container

		act(() => {
			widget?.destroy()
		})

		expect(getResultContent()).toMatchInlineSnapshot(`"false"`)
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
