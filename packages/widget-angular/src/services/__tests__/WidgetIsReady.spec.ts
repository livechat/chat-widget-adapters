import mitt from 'mitt'
import { NgZone } from '@angular/core'
import { createWidget } from '@livechat/widget-core'
import type { ExtendedWindow, WidgetInstance } from '@livechat/widget-core'

import { WidgetIsReadyService } from '../WidgetIsReady.service'

declare const window: ExtendedWindow

describe('WidgetIsReadyService', () => {
	const emitter = mitt()
	let widget: WidgetInstance
	let service: WidgetIsReadyService

	beforeEach(() => {
		widget = createWidget({ license: '123456' })
		service = new WidgetIsReadyService(new NgZone({}))
		window.LiveChatWidget.on = window.LiveChatWidget.once = emitter.on.bind(null) as typeof window.LiveChatWidget.on

		widget.init()
	})

	afterEach(() => {
		widget.destroy()
	})

	it('should return `false` as default value', () => {
		expect(service.subject.getValue()).toMatchInlineSnapshot(`false`)
	})

	it('should return `true` if widget is ready', () => {
		emitter.emit('ready')

		expect(service.subject.getValue()).toMatchInlineSnapshot(`true`)
	})

	it('should return `false` if widget was destroyed', () => {
		widget.destroy()

		expect(service.subject.getValue()).toMatchInlineSnapshot(`false`)
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
