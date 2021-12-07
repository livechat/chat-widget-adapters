import type { ExtendedWindow } from '../types'
import type { WidgetConfig, WidgetInstance } from '../create-widget'

declare const window: ExtendedWindow

describe('createWidget', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	const widgetConfig: WidgetConfig = {
		license: '123456',
		visibility: 'maximized',
		customerName: 'John Doe',
		customerEmail: 'john.doe@example.com',
		onReady: () => {},
		onNewEvent: () => {},
		onFormSubmitted: () => {},
		onGreetingHidden: () => {},
		onRatingSubmitted: () => {},
		onGreetingDisplayed: () => {},
		onVisibilityChanged: () => {},
		onAvailabilityChanged: () => {},
		onCustomerStatusChanged: () => {},
		onRichMessageButtonClicked: () => {},
	}

	const mockLiveChatWidget: ExtendedWindow['LiveChatWidget'] = {
		on: jest.fn(),
		once: jest.fn(),
		off: jest.fn(),
		call: jest.fn(),
		get: jest.fn(),
		init: jest.fn(),
	}
	const mockCreateJSApi = jest.fn().mockImplementation(() => (window.LiveChatWidget = mockLiveChatWidget))
	const mockAssignConfiguration = jest.fn().mockImplementation(() => (window.__lc = {} as any))
	const mockAssignEventHandlers = jest.fn()
	const mockAssignCustomerData = jest.fn()
	const mockAssignVisibility = jest.fn()
	const mockLifecycleEmit = jest.fn()

	jest.mock('../create-js-api.ts', () => ({ createJSApi: mockCreateJSApi }))
	jest.mock('../assign-configuration.ts', () => ({ assignConfiguration: mockAssignConfiguration }))
	jest.mock('../assign-event-handlers.ts', () => ({ assignEventHandlers: mockAssignEventHandlers }))
	jest.mock('../assign-customere-data.ts', () => ({ assignCustomerData: mockAssignCustomerData }))
	jest.mock('../assign-visibility.ts', () => ({ assignVisibility: mockAssignVisibility }))
	jest.mock('../lifecycle.ts', () => ({ lifecycleEmit: mockLifecycleEmit }))

	const { createWidget } = require('../create-widget')

	it('should handle initial config', () => {
		createWidget(widgetConfig)

		expect(mockAssignConfiguration).toBeCalledWith(widgetConfig)
		expect(mockAssignVisibility).toBeCalledWith(widgetConfig.visibility)
		expect(mockAssignEventHandlers).toBeCalledWith('on', {
			onReady: widgetConfig.onReady,
			onNewEvent: widgetConfig.onNewEvent,
			onFormSubmitted: widgetConfig.onFormSubmitted,
			onGreetingHidden: widgetConfig.onGreetingHidden,
			onRatingSubmitted: widgetConfig.onRatingSubmitted,
			onGreetingDisplayed: widgetConfig.onGreetingDisplayed,
			onVisibilityChanged: widgetConfig.onVisibilityChanged,
			onAvailabilityChanged: widgetConfig.onAvailabilityChanged,
			onCustomerStatusChanged: widgetConfig.onCustomerStatusChanged,
			onRichMessageButtonClicked: widgetConfig.onRichMessageButtonClicked,
		})
		expect(mockAssignCustomerData).toBeCalledWith({
			name: widgetConfig.customerName,
			email: widgetConfig.customerEmail,
		})
		expect(window.__lc).toHaveProperty('integration_name')
	})

	it('should handle init method', () => {
		const widget: WidgetInstance = createWidget(widgetConfig)

		widget.init()

		expect(mockLifecycleEmit).toBeCalledWith('init')
		expect(mockLiveChatWidget.init).toBeCalled()
	})

	it('should handle destroy method', () => {
		const widget: WidgetInstance = createWidget(widgetConfig)

		widget.destroy()

		expect(mockLifecycleEmit).toBeCalledWith('destroy')
		expect(mockLiveChatWidget.call).toBeCalledWith('destroy')
	})

	it('should handle updateVisibility method', () => {
		const widget: WidgetInstance = createWidget(widgetConfig)

		widget.updateVisibility('minimized')

		expect(mockAssignVisibility).toBeCalledWith('minimized')
	})

	it('should handle updateEventHandlers method', () => {
		const widget: WidgetInstance = createWidget(widgetConfig)
		jest.clearAllMocks()

		widget.updateEventHandlers({ onReady: widgetConfig.onReady })

		expect(mockAssignEventHandlers.mock.calls).toMatchInlineSnapshot(`
		Array [
		  Array [
		    "off",
		    Object {
		      "onAvailabilityChanged": [Function],
		      "onCustomerStatusChanged": [Function],
		      "onFormSubmitted": [Function],
		      "onGreetingDisplayed": [Function],
		      "onGreetingHidden": [Function],
		      "onNewEvent": [Function],
		      "onRatingSubmitted": [Function],
		      "onReady": [Function],
		      "onRichMessageButtonClicked": [Function],
		      "onVisibilityChanged": [Function],
		    },
		  ],
		  Array [
		    "on",
		    Object {
		      "onReady": [Function],
		    },
		  ],
		]
	`)
	})

	it('should handle updateSessionVariables method', () => {
		const widget: WidgetInstance = createWidget(widgetConfig)

		widget.updateSessionVariables({ foo: 'bar' })

		expect(mockLiveChatWidget.call).toBeCalledWith('update_session_variables', { foo: 'bar' })
	})

	it('should do nothing for updateSessionVariables method with empty payload', () => {
		const widget: WidgetInstance = createWidget(widgetConfig)

		widget.updateSessionVariables(undefined as any)

		expect(mockLiveChatWidget.call).not.toBeCalled()
	})

	it('should handle hideGreeting method', () => {
		const widget: WidgetInstance = createWidget(widgetConfig)

		widget.hideGreeting()

		expect(mockLiveChatWidget.call).toBeCalledWith('hide_greeting')
	})

	it('should handle updateCustomerData method', () => {
		const widget: WidgetInstance = createWidget(widgetConfig)

		widget.updateCustomerData({ name: 'foo' })

		expect(mockAssignCustomerData).toBeCalledWith({ name: 'foo' })
	})
})
