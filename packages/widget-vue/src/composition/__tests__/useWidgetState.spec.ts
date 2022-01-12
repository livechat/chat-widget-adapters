import mitt from 'mitt'
import { nextTick } from 'vue'
import { createWidget, ExtendedWindow, WidgetInstance } from '@livechat/widget-core'

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
		container = createHookValueContainer(useWidgetState, document.getElementById('root') as HTMLElement)
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

	it('should return `null` when after chnage evets if widget is not ready yet', async () => {
		const { getResultContent } = container

		emitter.emit('visibility_changed', { visibility: 'visible' })
		emitter.emit('availability_changed', { availability: 'online' })
		await nextTick()

		expect(getResultContent()).toMatchInlineSnapshot(`"null"`)
	})

	it('should return `state` when widget is ready', async () => {
		const { getResultContent } = container

		emitter.emit('ready', {
			state: {
				visibility: 'hidden',
				availability: 'offline',
			},
		})
		await nextTick()

		expect(getResultContent()).toMatchInlineSnapshot(`
		"{
		  \\"visibility\\": \\"hidden\\",
		  \\"availability\\": \\"offline\\"
		}"
	`)
	})

	it('should return updated `visibility`', async () => {
		const { getResultContent } = container

		emitter.emit('ready', {
			state: {
				visibility: 'hidden',
				availability: 'offline',
			},
		})
		emitter.emit('visibility_changed', { visibility: 'visible' })
		await nextTick()

		expect(getResultContent()).toMatchInlineSnapshot(`
		"{
		  \\"visibility\\": \\"visible\\",
		  \\"availability\\": \\"offline\\"
		}"
	`)
	})

	it('should return updated `availability`', async () => {
		const { getResultContent } = container

		emitter.emit('ready', {
			state: {
				visibility: 'hidden',
				availability: 'offline',
			},
		})
		emitter.emit('availability_changed', { availability: 'online' })
		await nextTick()

		expect(getResultContent()).toMatchInlineSnapshot(`
		"{
		  \\"visibility\\": \\"hidden\\",
		  \\"availability\\": \\"online\\"
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
