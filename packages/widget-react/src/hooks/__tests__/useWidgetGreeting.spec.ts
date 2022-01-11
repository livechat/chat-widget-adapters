import { act } from 'react-dom/test-utils'
import { createWidget, Greeting } from '@livechat/widget-core'
import type { ExtendedWindow, WidgetInstance } from '@livechat/widget-core'

import { useWidgetGreeting } from '../useWidgetGreeting'
import { createDispatcher, createHookValueContainer } from './test-utils'

declare const window: ExtendedWindow

describe('useWidgetGreeting', () => {
	let widget: WidgetInstance
	let container: ReturnType<typeof createHookValueContainer>
	const { setListener, dispatch } = createDispatcher()
	const greeting: Greeting = {
		id: 1,
		uniqueId: 'abcdef',
	}

	beforeEach(() => {
		document.body.innerHTML = '<div id="root"></div>'
		widget = createWidget({ license: '123456' })
		container = createHookValueContainer(useWidgetGreeting, document.getElementById('root'))
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

	it('should return `greeting` when it is displayed', () => {
		const { getResultContent } = container

		act(() => {
			dispatch('greeting_displayed', greeting)
		})

		expect(getResultContent()).toMatchInlineSnapshot(`
		"{
		  \\"id\\": 1,
		  \\"uniqueId\\": \\"abcdef\\"
		}"
	`)
	})

	it('should return `null` if greeting was hidden', () => {
		const { getResultContent } = container

		act(() => {
			dispatch('greeting_hidden')
		})

		expect(getResultContent()).toMatchInlineSnapshot(`"null"`)
	})

	it('should return `null` if widget was destroyed', () => {
		const { getResultContent } = container

		act(() => {
			widget?.destroy()
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
