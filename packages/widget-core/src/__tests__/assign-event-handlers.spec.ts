import { assignEventHandlers } from '../assign-event-handlers'
import { createJSApi } from '../create-js-api'
import type { ExtendedWindow, EventHandlers } from '../types'

declare const window: ExtendedWindow

function getNoop(name: string): VoidFunction {
	const noop = () => {}
	Object.defineProperty(noop, 'name', { value: name })
	return noop
}
const methods: Array<Parameters<typeof assignEventHandlers>['0']> = ['on', 'off', 'once']

describe('assignEventHandlers', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	const eventHandlers: EventHandlers = {
		onReady: getNoop('onReady'),
		onNewEvent: getNoop('onNewEvent'),
		onFormSubmitted: getNoop('onFormSubmitted'),
		onGreetingHidden: getNoop('onGreetingHidden'),
		onRatingSubmitted: getNoop('onRatingSubmitted'),
		onGreetingDisplayed: getNoop('onGreetingDisplayed'),
		onVisibilityChanged: getNoop('onVisibilityChanged'),
		onAvailabilityChanged: getNoop('onAvailabilityChanged'),
		onCustomerStatusChanged: getNoop('onCustomerStatusChanged'),
		onRichMessageButtonClicked: getNoop('onRichMessageButtonClicked'),
	}
	const expected = {
		ready: eventHandlers.onReady,
		new_event: eventHandlers.onNewEvent,
		form_submitted: eventHandlers.onFormSubmitted,
		greeting_hidden: eventHandlers.onGreetingHidden,
		rating_submitted: eventHandlers.onRatingSubmitted,
		greeting_displayed: eventHandlers.onGreetingDisplayed,
		visibility_changed: eventHandlers.onVisibilityChanged,
		availability_changed: eventHandlers.onAvailabilityChanged,
		customer_status_changed: eventHandlers.onCustomerStatusChanged,
		rich_message_button_clicked: eventHandlers.onRichMessageButtonClicked,
	}

	methods.forEach((method) => {
		it(`should handle ${method} method`, () => {
			createJSApi()
			const spy = jest.spyOn(window.LiveChatWidget, method)

			assignEventHandlers(method, eventHandlers)

			Object.keys(expected).forEach((expectedEvent) => {
				const [event, handler] = spy.mock.calls.find(([event]) => expectedEvent === event) || []
				expect(event).toBeDefined()
				expect(handler).toBeDefined()
				expect(expected[event as keyof typeof expected]).toBe(handler)
			})
		})
	})

	it('should not register any handlers for empty data object', () => {
		createJSApi()
		const spy = jest.spyOn(window.LiveChatWidget, 'on')

		assignEventHandlers('on', {})

		expect(spy).not.toBeCalled()
	})

	it('should do nothing if unregistering with not existing global object', () => {
		window.LiveChatWidget = undefined as any
		expect(() => assignEventHandlers('off', { onReady: () => {} })).not.toThrow()
	})
})
