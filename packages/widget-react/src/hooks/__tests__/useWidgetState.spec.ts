import mitt from 'mitt'
import { act } from 'react-dom/test-utils'
import { createWidget } from '@livechat/widget-core'
import type { ExtendedWindow, WidgetInstance } from '@livechat/widget-core'

import { useWidgetState } from '../useWidgetState'
import { createHookValueContainer } from './test-utils'

declare const window: ExtendedWindow

describe('useWidgetState', () => {
	const emitter = mitt()
	let widget: WidgetInstance
	let container: ReturnType<typeof createHookValueContainer>

	beforeEach(() => {
		document.body.innerHTML = '<div id="root"></div>'
		widget = createWidget({ license: '123456' })
		container = createHookValueContainer(useWidgetState, document.getElementById('root'))
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

	it('should return `null` as default value', () => {
		const { getResultContent } = container

		expect(getResultContent()).toMatchInlineSnapshot(`"null"`)
	})

	it('should return `null` if after change events widget is not ready yet', () => {
		const { getResultContent } = container

		act(() => {
			emitter.emit('visibility_changed', { visibility: 'visible' })
			emitter.emit('availability_changed', { availability: 'online' })
		})

		expect(getResultContent()).toMatchInlineSnapshot(`"null"`)
	})

	it('should return `state` when widget is ready', () => {
		const { getResultContent } = container

		act(() => {
			emitter.emit('ready', {
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
			emitter.emit('ready', {
				state: {
					visibility: 'hidden',
					availability: 'offline',
				},
			})
			emitter.emit('visibility_changed', { visibility: 'visible' })
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
			emitter.emit('ready', {
				state: {
					visibility: 'hidden',
					availability: 'offline',
				},
			})
			emitter.emit('availability_changed', { availability: 'online' })
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
