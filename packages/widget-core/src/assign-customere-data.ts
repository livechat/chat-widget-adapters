import type { ExtendedWindow, MutableCustomerData } from './types'

declare const window: ExtendedWindow

export function assignCustomerData(customerData: Partial<MutableCustomerData>): void {
	if (typeof customerData.name === 'string') {
		window.LiveChatWidget.call('set_customer_name', customerData.name)
	}
	if (typeof customerData.email === 'string') {
		window.LiveChatWidget.call('set_customer_email', customerData.email)
	}
}
