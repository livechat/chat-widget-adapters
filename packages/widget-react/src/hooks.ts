import * as React from 'react'
import { assignEventHandlers, getData } from '@livechat/widget-core'
import type { WidgetState, CustomerData, Event, ChatData } from '@livechat/widget-core'

export function useWidgetIsReady(): boolean {
	const [isReady, setIsReady] = React.useState(false)

	React.useEffect(() => {
		const onReady = () => setIsReady(true)
		assignEventHandlers('once', { onReady })
		return () => {
			assignEventHandlers('off', { onReady })
		}
	}, [])

	return isReady
}

export function useWidgetState(): WidgetState | null {
	const [widgetState, setWidgetState] = React.useState<ReturnType<typeof useWidgetState>>(null)

	React.useEffect(() => {
		const onReady = ({ state }: { state: WidgetState }) => setWidgetState(state)
		const onVisibilityChanged = ({ visibility }: Pick<WidgetState, 'visibility'>) => {
			setWidgetState((prevState) => (prevState ? { ...prevState, visibility } : prevState))
		}
		const onAvailabilityChanged = ({ availability }: Pick<WidgetState, 'availability'>) => {
			setWidgetState((prevState) => (prevState ? { ...prevState, availability } : prevState))
		}

		assignEventHandlers('once', { onReady })
		assignEventHandlers('on', { onVisibilityChanged, onAvailabilityChanged })

		return () => {
			assignEventHandlers('off', { onReady, onVisibilityChanged, onAvailabilityChanged })
		}
	}, [])

	return widgetState
}

export function useWidgetCustomerData(): CustomerData | null {
	const [customerData, setCustomerData] = React.useState<CustomerData | null>(null)

	React.useEffect(() => {
		const onReady = ({ customerData }: { customerData: CustomerData }) => setCustomerData(customerData)
		const onCustomerStatusChanged = () => setCustomerData(getData('customer'))

		assignEventHandlers('once', { onReady })
		assignEventHandlers('on', { onCustomerStatusChanged })

		return () => {
			assignEventHandlers('off', { onReady, onCustomerStatusChanged })
		}
	}, [])

	return customerData
}

export function useWidgetChatData(): ChatData | null {
	const customerData = useWidgetCustomerData()
	const status = customerData?.status
	const [chatData, setChatData] = React.useState<ChatData | null>(null)

	React.useEffect(() => {
		if (status === 'chatting') {
			setChatData(getData('chat'))
		} else {
			setChatData(null)
		}
	}, [status])

	return chatData
}

export function useWidgetGreeting(): Event['greeting'] | null {
	const [greeting, setGreeting] = React.useState<Event['greeting'] | null>(null)

	React.useEffect(() => {
		const onGreetingDisplayed = (greeting: Event['greeting']) => setGreeting(greeting)
		const onGreetingHidden = () => setGreeting(null)

		assignEventHandlers('on', { onGreetingDisplayed, onGreetingHidden })
		return () => {
			assignEventHandlers('off', { onGreetingDisplayed, onGreetingHidden })
		}
	}, [])

	return greeting
}
