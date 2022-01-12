import mitt from 'mitt'
import { NgZone } from '@angular/core'
import { createWidget } from '@livechat/widget-core'
import type { ExtendedWindow, WidgetInstance, CustomerData } from '@livechat/widget-core'

import { WidgetChatDataService } from '../WidgetChatData.service'
import { WidgetCustomerDataService } from '../WidgetCustomerData.service'

declare const window: ExtendedWindow

describe('WidgetChatDataService', () => {
	const emitter = mitt()
	let widget: WidgetInstance
	let service: WidgetChatDataService

	beforeEach(() => {
		widget = createWidget({ license: '123456' })
		service = new WidgetChatDataService(new NgZone({}), new WidgetCustomerDataService(new NgZone({})))
		window.LiveChatWidget.on = window.LiveChatWidget.once = emitter.on.bind(null) as typeof window.LiveChatWidget.on

		widget.init()
	})

	afterEach(() => {
		widget.destroy()
	})

	it('should return `null` as default value', () => {
		expect(service.subject.getValue()).toMatchInlineSnapshot(`null`)
	})

	it('should return updated `chatData` if customer is chatting', () => {
		jest.spyOn(window.LiveChatWidget, 'get').mockImplementation(((name) => {
			if (name === 'customer_data') {
				return { status: 'chatting' }
			}
			if (name === 'chat_data') {
				return {
					chatId: 'abcdef',
					threadId: 'ghijkl',
				}
			}
		}) as typeof window.LiveChatWidget.get)

		emitter.emit('customer_status_changed')

		expect(service.subject.getValue()).toMatchInlineSnapshot(`
		Object {
		  "chatId": "abcdef",
		  "threadId": "ghijkl",
		}
	`)
	})

	it('should return `null` if customer is not chatting', () => {
		jest.spyOn(window.LiveChatWidget, 'get').mockImplementation((): CustomerData => {
			return { status: 'browsing' } as CustomerData
		})

		emitter.emit('customer_status_changed')

		expect(service.subject.getValue()).toMatchInlineSnapshot(`null`)
	})

	it('should close its `subject` on service destroy', () => {
		expect(service.subject.closed).toBeFalsy()

		service.ngOnDestroy()
		jest.runAllTimers()

		expect(service.subject.closed).toBeTruthy()
	})
})
