import mitt from 'mitt'
import { NgZone } from '@angular/core'
import { createWidget } from '@livechat/widget-core'
import type { ExtendedWindow, WidgetInstance, CustomerData } from '@livechat/widget-core'

import { WidgetCustomerDataService } from '../WidgetCustomerData.service'

declare const window: ExtendedWindow

describe('WidgetCustomerDataService', () => {
	const emitter = mitt()
	let widget: WidgetInstance
	let service: WidgetCustomerDataService
	const customerData: CustomerData = {
		id: 'abcdefg',
		name: 'John Doe',
		email: 'john.doe@example.com',
		isReturning: false,
		status: 'browsing',
		sessionVariables: {},
	}

	beforeEach(() => {
		widget = createWidget({ license: '123456' })
		service = new WidgetCustomerDataService(new NgZone({}))
		window.LiveChatWidget.on = window.LiveChatWidget.once = emitter.on.bind(null) as typeof window.LiveChatWidget.on

		widget.init()
	})

	afterEach(() => {
		widget.destroy()
	})

	it('should return `null` as default value', () => {
		expect(service.subject.getValue()).toMatchInlineSnapshot(`null`)
	})

	it('should return `customerData` if widget is ready', () => {
		emitter.emit('ready', { customerData })

		expect(service.subject.getValue()).toMatchInlineSnapshot(`
		Object {
		  "email": "john.doe@example.com",
		  "id": "abcdefg",
		  "isReturning": false,
		  "name": "John Doe",
		  "sessionVariables": Object {},
		  "status": "browsing",
		}
	`)
	})

	it('should return updated `customerData`', () => {
		jest.spyOn(window.LiveChatWidget, 'get').mockImplementation((): CustomerData => {
			return {
				...customerData,
				status: 'chatting',
				sessionVariables: {
					foo: 'bar',
				},
			}
		})

		emitter.emit('customer_status_changed')

		expect(service.subject.getValue()).toMatchInlineSnapshot(`
		Object {
		  "email": "john.doe@example.com",
		  "id": "abcdefg",
		  "isReturning": false,
		  "name": "John Doe",
		  "sessionVariables": Object {
		    "foo": "bar",
		  },
		  "status": "chatting",
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
