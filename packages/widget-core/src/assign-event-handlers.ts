import type { ExtendedWindow, EventHandlers } from './types'

declare const window: ExtendedWindow

export function assignEventHandlers(method: 'on' | 'off' | 'once', eventHandlers: EventHandlers): void {
	if (typeof eventHandlers.onReady === 'function') {
		window.LiveChatWidget[method]('ready', eventHandlers.onReady)
	}
	if (typeof eventHandlers.onAvailabilityChanged === 'function') {
		window.LiveChatWidget[method]('availability_changed', eventHandlers.onAvailabilityChanged)
	}
	if (typeof eventHandlers.onVisibilityChanged === 'function') {
		window.LiveChatWidget[method]('visibility_changed', eventHandlers.onVisibilityChanged)
	}
	if (typeof eventHandlers.onCustomerStatusChanged === 'function') {
		window.LiveChatWidget[method]('customer_status_changed', eventHandlers.onCustomerStatusChanged)
	}
	if (typeof eventHandlers.onNewEvent === 'function') {
		window.LiveChatWidget[method]('new_event', eventHandlers.onNewEvent)
	}
	if (typeof eventHandlers.onFormSubmitted === 'function') {
		window.LiveChatWidget[method]('form_submitted', eventHandlers.onFormSubmitted)
	}
	if (typeof eventHandlers.onRatingSubmitted === 'function') {
		window.LiveChatWidget[method]('rating_submitted', eventHandlers.onRatingSubmitted)
	}
	if (typeof eventHandlers.onGreetingDisplayed === 'function') {
		window.LiveChatWidget[method]('greeting_displayed', eventHandlers.onGreetingDisplayed)
	}
	if (typeof eventHandlers.onGreetingHidden === 'function') {
		window.LiveChatWidget[method]('greeting_hidden', eventHandlers.onGreetingHidden)
	}
	if (typeof eventHandlers.onRichMessageButtonClicked === 'function') {
		window.LiveChatWidget[method]('rich_message_button_clicked', eventHandlers.onRichMessageButtonClicked)
	}
}
