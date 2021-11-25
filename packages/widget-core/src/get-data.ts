import type { ChatData, CustomerData, ExtendedWindow } from './types'

declare const window: ExtendedWindow

export function getData(entity: 'chat'): ChatData
export function getData(entity: 'customer'): CustomerData
export function getData(entity: 'chat' | 'customer'): ChatData | CustomerData | null {
	if (entity === 'chat') {
		return window.LiveChatWidget.get('chat_data')
	}
	if (entity === 'customer') {
		return window.LiveChatWidget.get('customer_data')
	}
	return null
}
