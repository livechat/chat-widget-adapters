import * as React from 'react'
import { lcOnInit, lcOnDestroy, assignEventHandlers, getData } from '@livechat/widget-core'
import type { CustomerData } from '@livechat/widget-core'

export function useWidgetCustomerData(): CustomerData | null {
	const [customerData, setCustomerData] = React.useState<CustomerData | null>(null)

	React.useEffect(() => {
		const onReady = ({ customerData }: { customerData: CustomerData }) => setCustomerData(customerData)
		const onCustomerStatusChanged = () => setCustomerData(getData('customer'))

		const unsubscribeInit = lcOnInit(() => {
			assignEventHandlers('once', { onReady })
			assignEventHandlers('on', { onCustomerStatusChanged })
		})
		const unsubscribeDestroy = lcOnDestroy(() => {
			setCustomerData(null)
		})

		return () => {
			assignEventHandlers('off', { onReady, onCustomerStatusChanged })
			unsubscribeInit()
			unsubscribeDestroy()
		}
	}, [])

	return customerData
}
