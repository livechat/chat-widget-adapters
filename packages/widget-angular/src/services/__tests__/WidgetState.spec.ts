import mitt from 'mitt'
import { NgZone } from '@angular/core'
import { createWidget } from '@livechat/widget-core'
import type { ExtendedWindow, WidgetInstance } from '@livechat/widget-core'

import { WidgetStateService } from '../WidgetState.service'

declare const window: ExtendedWindow

describe('WidgetStateService', () => {
	const emitter = mitt()
	let widget: WidgetInstance
	let service: WidgetStateService

	beforeEach(() => {
		widget = createWidget({ license: '123456' })
		service = new WidgetStateService(new NgZone({}))
		window.LiveChatWidget.on = window.LiveChatWidget.once = emitter.on.bind(null) as typeof window.LiveChatWidget.on

		widget.init()
	})

	afterEach(() => {
		widget.destroy()
	})

	it('should return `null` as default value', () => {
		expect(service.subject.getValue()).toMatchInlineSnapshot(`null`)
	})

	it('should return `null` if after change events widget is not ready yet', () => {
		emitter.emit('visibility_changed', { visibility: 'visible' })
		emitter.emit('availability_changed', { availability: 'online' })

		expect(service.subject.getValue()).toMatchInlineSnapshot(`null`)
	})

	it('should return `state` when widget is ready', () => {
		emitter.emit('ready', {
			state: {
				visibility: 'hidden',
				availability: 'offline',
			},
		})

		expect(service.subject.getValue()).toMatchInlineSnapshot(`
		Object {
		  "availability": "offline",
		  "visibility": "hidden",
		}
	`)
	})

	it('should return updated `visibility`', () => {
		emitter.emit('ready', {
			state: {
				visibility: 'hidden',
				availability: 'offline',
			},
		})
		emitter.emit('visibility_changed', { visibility: 'visible' })

		expect(service.subject.getValue()).toMatchInlineSnapshot(`
		Object {
		  "availability": "offline",
		  "visibility": "visible",
		}
	`)
	})

	it('should return updated `availability`', () => {
		emitter.emit('ready', {
			state: {
				visibility: 'hidden',
				availability: 'offline',
			},
		})
		emitter.emit('availability_changed', { availability: 'online' })

		expect(service.subject.getValue()).toMatchInlineSnapshot(`
		Object {
		  "availability": "online",
		  "visibility": "hidden",
		}
	`)
	})

	it('should return `null` if widget was destroyed', () => {
		widget.destroy()

		expect(service.subject.getValue()).toMatchInlineSnapshot(`null`)
	})

	it('should cleanup event listeners on service destroy', () => {
		const offSpy = jest.spyOn(window.LiveChatWidget, 'off')

		service.ngOnDestroy()
		jest.runAllTimers()

		expect(offSpy).toBeCalled()
	})

	it('should close its `subject` on service destroy', () => {
		expect(service.subject.closed).toBeFalsy()

		service.ngOnDestroy()
		jest.runAllTimers()

		expect(service.subject.closed).toBeTruthy()
	})
})
