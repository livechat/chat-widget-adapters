import { createJSApi } from './create-js-api'
import { assignConfiguration } from './assign-configuration'
import { assignEventHandlers } from './assign-event-handlers'
import { assignCustomerData } from './assign-customere-data'
import { assignVisibility } from './assign-visibility'
import { lifecycleEmit } from './lifecycle'
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
	isLoading: boolean
	currentEventHandlers: EventHandlers
	desiredState: 'loaded' | 'destroyed' | 'unknown'
}

export function createWidget(config: WidgetConfig): WidgetInstance {
	const state: State = {
		isLoading: false,
		desiredState: 'unknown',
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

	const scriptRef = createJSApi()
	assignConfiguration(config)
	assignVisibility(config.visibility)
	assignEventHandlers('on', state.currentEventHandlers)
	assignCustomerData({
		name: config.customerName,
		email: config.customerEmail,
	})

	window.__lc.integration_name = process.env.PACKAGE_NAME

	return {
		init: () => {
			state.desiredState = 'loaded'
			if (state.isLoading) {
				return
			}

			// @ts-ignore
			// eslint-disable-next-line
			;(window.LC_API = window.LC_API || {}).on_after_load = () => {
				state.isLoading = false
				if (state.desiredState === 'destroyed') {
					lifecycleEmit('destroy')
					scriptRef.current?.remove()
					window.LiveChatWidget.call('destroy')
				}
				state.desiredState = 'unknown'
			}

			lifecycleEmit('init')
			state.isLoading = true
			window.LiveChatWidget.init()
		},
		destroy: () => {
			state.desiredState = 'destroyed'
			if (state.isLoading) {
				return
			}

			lifecycleEmit('destroy')
			scriptRef.current?.remove()
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
