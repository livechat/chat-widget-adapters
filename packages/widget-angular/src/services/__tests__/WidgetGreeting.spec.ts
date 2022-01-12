import mitt from 'mitt'
import { NgZone } from '@angular/core'
import { createWidget } from '@livechat/widget-core'
import type { ExtendedWindow, WidgetInstance, Greeting } from '@livechat/widget-core'

import { WidgetGreetingService } from '../WidgetGreeting.service'

declare const window: ExtendedWindow

describe('WidgetGreetingService', () => {
	const emitter = mitt()
	let widget: WidgetInstance
	let service: WidgetGreetingService
	const greeting: Greeting = {
		id: 1,
		uniqueId: 'abcdef',
	}

	beforeEach(() => {
		widget = createWidget({ license: '123456' })
		service = new WidgetGreetingService(new NgZone({}))
		window.LiveChatWidget.on = window.LiveChatWidget.once = emitter.on.bind(null) as typeof window.LiveChatWidget.on

		widget.init()
	})

	afterEach(() => {
		widget.destroy()
	})

	it('should return `null` as default value', () => {
		expect(service.subject.getValue()).toMatchInlineSnapshot(`null`)
	})

	it('should return `greeting` when it is displayed', () => {
		emitter.emit('greeting_displayed', greeting)

		expect(service.subject.getValue()).toMatchInlineSnapshot(`
		Object {
		  "id": 1,
		  "uniqueId": "abcdef",
		}
	`)
	})

	it('should return `null` if greeting was hidden', () => {
		emitter.emit('greeting_hidden')

		expect(service.subject.getValue()).toMatchInlineSnapshot(`null`)
	})

	it('should return `null` if widget was destroyed', () => {
		widget?.destroy()

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
