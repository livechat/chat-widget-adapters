import { createJSApi } from './create-js-api'
import { assignConfiguration } from './assign-configuration'
import { assignEventHandlers } from './assign-event-handlers'
import { assignCustomerData } from './assign-customere-data'
import { assignVisibility } from './assign-visibility'
import type {
	ExtendedWindow,
	WidgetState,
	EventHandlers,
	ConfigurationOptions,
	CustomerData,
	MutableCustomerData,
} from './types'

declare const window: ExtendedWindow

export type WidgetConfig = ConfigurationOptions &
	EventHandlers & {
		visibility?: WidgetState['visibility']
		customerName?: CustomerData['name']
		customerEmail?: CustomerData['email']
	}

export type WidgetInstance = {
	init: VoidFunction
	destroy: VoidFunction
	hideGreeting: VoidFunction
	updateVisibility: (visibility?: WidgetState['visibility']) => void
	updateEventHandlers: (eventHandlers: EventHandlers) => void
	updateSessionVariables: (sessionVariables: WidgetConfig['sessionVariables']) => void
	updateCustomerData: (customerData: Partial<MutableCustomerData>) => void
}

type State = {
	currentEventHandlers: EventHandlers
}

export function createWidget(config: WidgetConfig): WidgetInstance {
	const state: State = {
		currentEventHandlers: {
			onReady: config.onReady,
			onNewEvent: config.onNewEvent,
			onFormSubmitted: config.onFormSubmitted,
			onGreetingHidden: config.onGreetingHidden,
			onRatingSubmitted: config.onRatingSubmitted,
			onGreetingDisplayed: config.onGreetingDisplayed,
			onVisibilityChanged: config.onVisibilityChanged,
			onAvailabilityChanged: config.onAvailabilityChanged,
			onCustomerStatusChanged: config.onCustomerStatusChanged,
			onRichMessageButtonClicked: config.onRichMessageButtonClicked,
		},
	}

	createJSApi()
	assignConfiguration(config)
	assignVisibility(config.visibility)
	assignEventHandlers('on', state.currentEventHandlers)
	assignEventHandlers('once', {
		onReady: () => {
			assignCustomerData({
				name: config.customerName,
				email: config.customerEmail,
			})
		},
	})

	return {
		init: () => {
			window.LiveChatWidget.init()
		},
		destroy: () => {
			window.LiveChatWidget.call('destroy')
		},
		updateVisibility: (visibility) => {
			assignVisibility(visibility)
		},
		updateEventHandlers: (eventHabndlers) => {
			assignEventHandlers('off', state.currentEventHandlers)
			assignEventHandlers('on', eventHabndlers)
			state.currentEventHandlers = { ...eventHabndlers }
		},
		updateSessionVariables: (sessionVariables) => {
			if (sessionVariables) {
				window.LiveChatWidget.call('update_session_variables', sessionVariables)
			}
		},
		hideGreeting: () => {
			window.LiveChatWidget.call('hide_greeting')
		},
		updateCustomerData: (customerData) => {
			assignCustomerData(customerData)
		},
	}
}
