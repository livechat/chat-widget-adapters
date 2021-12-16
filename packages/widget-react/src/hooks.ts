import * as React from 'react'
import { lcOnInit, lcOnDestroy, assignEventHandlers, getData } from '@livechat/widget-core'
import type { WidgetState, CustomerData, ChatData, Greeting } from '@livechat/widget-core'

export function useWidgetIsReady(): boolean {
	const [isReady, setIsReady] = React.useState(false)

	React.useEffect(() => {
		const onReady = () => setIsReady(true)
		const unsubscribeInit = lcOnInit(() => {
			assignEventHandlers('once', { onReady })
		})
		const unsubscribeDestroy = lcOnDestroy(() => {
			setIsReady(false)
		})
		return () => {
			assignEventHandlers('off', { onReady })
			unsubscribeInit()
			unsubscribeDestroy()
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

		const unsubscribeInit = lcOnInit(() => {
			assignEventHandlers('once', { onReady })
			assignEventHandlers('on', { onVisibilityChanged, onAvailabilityChanged })
		})
		const unsubscribeDestroy = lcOnDestroy(() => {
			setWidgetState(null)
		})

		return () => {
			assignEventHandlers('off', { onReady, onVisibilityChanged, onAvailabilityChanged })
			unsubscribeInit()
			unsubscribeDestroy()
		}
	}, [])

	return widgetState
}

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

export function useWidgetGreeting(): Greeting | null {
	const [greeting, setGreeting] = React.useState<Greeting | null>(null)

	React.useEffect(() => {
		const onGreetingDisplayed = (greeting: Greeting) => setGreeting(greeting)
		const onGreetingHidden = () => setGreeting(null)

		const unsubscribeInit = lcOnInit(() => {
			assignEventHandlers('on', { onGreetingDisplayed, onGreetingHidden })
		})
		const unsubscribeDestroy = lcOnDestroy(() => {
			setGreeting(null)
		})

		return () => {
			assignEventHandlers('off', { onGreetingDisplayed, onGreetingHidden })
			unsubscribeInit()
			unsubscribeDestroy()
		}
	}, [])

	return greeting
}
