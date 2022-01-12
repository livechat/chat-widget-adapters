import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import { lcOnInit, lcOnDestroy, assignEventHandlers, getData } from '@livechat/widget-core'
import type { CustomerData } from '@livechat/widget-core'

export function useWidgetCustomerData(): Ref<CustomerData | null> {
	const customerData = ref<CustomerData | null>(null)
	let unsubscribeInit: VoidFunction | null = null
	let unsubscribeDestroy: VoidFunction | null = null

	const onReady = (payload: { customerData: CustomerData }) => {
		customerData.value = payload.customerData
	}
	const onCustomerStatusChanged = () => {
		customerData.value = getData('customer')
	}

	onMounted(() => {
		unsubscribeInit = lcOnInit(() => {
			assignEventHandlers('once', { onReady })
			assignEventHandlers('on', { onCustomerStatusChanged })
		})
		unsubscribeDestroy = lcOnDestroy(() => {
			customerData.value = null
		})
	})
	onUnmounted(() => {
		assignEventHandlers('off', { onReady, onCustomerStatusChanged })
		unsubscribeInit?.()
		unsubscribeDestroy?.()
	})

	return customerData
}
