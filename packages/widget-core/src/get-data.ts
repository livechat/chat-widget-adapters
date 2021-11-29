import type { WidgetState, ChatData, CustomerData, ExtendedWindow } from './types'

declare const window: ExtendedWindow

export function getData(entity: 'state'): WidgetState
export function getData(entity: 'chat'): ChatData
export function getData(entity: 'customer'): CustomerData
export function getData(entity: 'state' | 'chat' | 'customer'): WidgetState | ChatData | CustomerData | null {
	if (entity === 'state') {
		return window.LiveChatWidget.get('state')
	}
	if (entity === 'chat') {
		return window.LiveChatWidget.get('chat_data')
	}
	if (entity === 'customer') {
		return window.LiveChatWidget.get('customer_data')
	}
	return null
}
