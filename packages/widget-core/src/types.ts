export type ExtendedWindow = Window & {
	__lc: {
		license: number
		group?: number
		params?: Array<{ name: string; value: string }>
		chat_between_groups?: boolean
		integration_name?: string
	}
	LiveChatWidget: {
		on: typeof on
		off: typeof on
		once: typeof on
		get: typeof get
		call: typeof call
		init: VoidFunction
	}
}

declare function on(name: 'ready', handler: EventHandlers['onReady']): void
declare function on(name: 'new_event', handler: EventHandlers['onNewEvent']): void
declare function on(name: 'form_submitted', handler: EventHandlers['onFormSubmitted']): void
declare function on(name: 'greeting_hidden', handler: EventHandlers['onGreetingHidden']): void
declare function on(name: 'rating_submitted', handler: EventHandlers['onRatingSubmitted']): void
declare function on(name: 'visibility_changed', handler: EventHandlers['onVisibilityChanged']): void
declare function on(name: 'greeting_displayed', handler: EventHandlers['onGreetingDisplayed']): void
declare function on(name: 'availability_changed', handler: EventHandlers['onAvailabilityChanged']): void
declare function on(name: 'customer_status_changed', handler: EventHandlers['onCustomerStatusChanged']): void
declare function on(name: 'rich_message_button_clicked', handler: EventHandlers['onRichMessageButtonClicked']): void

declare function get(name: 'state'): WidgetState
declare function get(name: 'chat_data'): ChatData
declare function get(name: 'customer_data'): CustomerData

declare function call(name: 'hide'): void
declare function call(name: 'maximize'): void
declare function call(name: 'minimize'): void
declare function call(name: 'destroy'): void
declare function call(name: 'hide_greeting'): void
declare function call(name: 'set_customer_name', payload: CustomerData['name']): void
declare function call(name: 'set_customer_email', payload: CustomerData['email']): void
declare function call(name: 'set_session_variables', payload: CustomerData['sessionVariables']): void
declare function call(name: 'update_session_variables', payload: CustomerData['sessionVariables']): void

export type MutableCustomerData = {
	name: string
	email: string
}

export type CustomerData = MutableCustomerData & {
	id: string
	isReturning: boolean
	status: 'queued' | 'chatting' | 'browsing' | 'invited'
	sessionVariables: Record<string, string>
}

export type ConfigurationOptions = {
	license: string
	group?: string
	chatBetweenGroups?: boolean
	sessionVariables?: CustomerData['sessionVariables']
}

export type ChatData = {
	chatId: string
	threadId: string
}

export type Greeting = {
	id: number
	uniqueId: string
}

export type ChatEvent = {
	timestamp: number
	type: 'message' | 'rich_message' | 'file'
	author: {
		id: string
		type: 'customer' | 'agent'
	}
	greeting?: Greeting
}

export type RichMessageButton = {
	eventId: string
	postbackId: string
	greeting?: Greeting
}

export type WidgetState = {
	availability: 'online' | 'offline'
	visibility: 'maximized' | 'minimized' | 'hidden'
}

export type EventHandlers = {
	onReady?: (data: { state: WidgetState; customerData: CustomerData }) => void
	onAvailabilityChanged?: (data: Pick<WidgetState, 'availability'>) => void
	onVisibilityChanged?: (data: Pick<WidgetState, 'visibility'>) => void
	onCustomerStatusChanged?: (data: Pick<CustomerData, 'status'>) => void
	onNewEvent?: (event: ChatEvent) => void
	onFormSubmitted?: (data: { type: 'prechat' | 'postchat' | 'ticket' }) => void
	onRatingSubmitted?: (rating: 'good' | 'bad' | 'none') => void
	onGreetingDisplayed?: (greeting: Greeting) => void
	onGreetingHidden?: (greeting: Greeting) => void
	onRichMessageButtonClicked?: (button: RichMessageButton) => void
}

export type EventHandlerPayload<T extends keyof EventHandlers, E = Required<EventHandlers>[T]> = E extends (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	...args: any
) => void
	? Parameters<E>['0']
	: never
