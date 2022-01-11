import { act } from 'react-dom/test-utils'
import { createWidget } from '@livechat/widget-core'
import type { ExtendedWindow, WidgetInstance } from '@livechat/widget-core'

import { useWidgetState } from '../useWidgetState'
import { createDispatcher, createHookValueContainer } from './test-utils'

declare const window: ExtendedWindow

describe('useWidgetState', () => {
	let widget: WidgetInstance
	let container: ReturnType<typeof createHookValueContainer>
	const { setListener, dispatch } = createDispatcher()

	beforeEach(() => {
		document.body.innerHTML = '<div id="root"></div>'
		widget = createWidget({ license: '123456' })
		container = createHookValueContainer(useWidgetState, document.getElementById('root'))
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

	it('should return `null` when after chnage evets if widget is not ready yet', () => {
		const { getResultContent } = container

		act(() => {
			dispatch('visibility_changed', { visibility: 'visible' })
			dispatch('availability_changed', { availability: 'online' })
		})
		expect(getResultContent()).toMatchInlineSnapshot(`"null"`)
	})

	it('should return `state` when widget is ready', () => {
		const { getResultContent } = container

		act(() => {
			dispatch('ready', {
				state: {
					visibility: 'hidden',
					availability: 'offline',
				},
			})
		})
		expect(getResultContent()).toMatchInlineSnapshot(`
		"{
		  \\"visibility\\": \\"hidden\\",
		  \\"availability\\": \\"offline\\"
		}"
	`)
	})

	it('should return updated `visibility`', () => {
		const { getResultContent } = container

		act(() => {
			dispatch('ready', {
				state: {
					visibility: 'hidden',
					availability: 'offline',
				},
			})
			dispatch('visibility_changed', { visibility: 'visible' })
		})
		expect(getResultContent()).toMatchInlineSnapshot(`
		"{
		  \\"visibility\\": \\"visible\\",
		  \\"availability\\": \\"offline\\"
		}"
	`)
	})

	it('should return updated `availability`', () => {
		const { getResultContent } = container

		act(() => {
			dispatch('ready', {
				state: {
					visibility: 'hidden',
					availability: 'offline',
				},
			})
			dispatch('availability_changed', { availability: 'online' })
		})
		expect(getResultContent()).toMatchInlineSnapshot(`
		"{
		  \\"visibility\\": \\"hidden\\",
		  \\"availability\\": \\"online\\"
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
