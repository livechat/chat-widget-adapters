import { ref, watch, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import { lcOnInit, lcOnDestroy, assignEventHandlers, getData } from '@livechat/widget-core'
import type { WidgetState, CustomerData, ChatData, Event } from '@livechat/widget-core'

export function useWidgetIsReady(): Ref<boolean> {
	const isReady = ref(false)
	let unsubscribeInit: VoidFunction | null = null
	let unsubscribeDestroy: VoidFunction | null = null

	const onReady = () => {
		isReady.value = true
	}

	onMounted(() => {
		unsubscribeInit = lcOnInit(() => {
			assignEventHandlers('once', { onReady })
		})
		unsubscribeDestroy = lcOnDestroy(() => {
			isReady.value = false
		})
	})
	onUnmounted(() => {
		try {
			assignEventHandlers('off', { onReady })
		} finally {
			unsubscribeInit?.()
			unsubscribeDestroy?.()
		}
	})

	return isReady
}

export function useWidgetState(): Ref<WidgetState | null> {
	const widgetState = ref<WidgetState | null>(null)
	let unsubscribeInit: VoidFunction | null = null
	let unsubscribeDestroy: VoidFunction | null = null

	const onReady = ({ state }: { state: WidgetState }) => {
		widgetState.value = state
	}
	const onVisibilityChanged = ({ visibility }: Pick<WidgetState, 'visibility'>) => {
		widgetState.value = widgetState.value ? { ...widgetState.value, visibility } : widgetState.value
	}
	const onAvailabilityChanged = ({ availability }: Pick<WidgetState, 'availability'>) => {
		widgetState.value = widgetState.value ? { ...widgetState.value, availability } : widgetState.value
	}

	onMounted(() => {
		unsubscribeInit = lcOnInit(() => {
			assignEventHandlers('once', { onReady })
			assignEventHandlers('on', { onVisibilityChanged, onAvailabilityChanged })
		})
		unsubscribeDestroy = lcOnDestroy(() => {
			widgetState.value = null
		})
	})
	onUnmounted(() => {
		try {
			assignEventHandlers('off', { onReady, onVisibilityChanged, onAvailabilityChanged })
		} finally {
			unsubscribeInit?.()
			unsubscribeDestroy?.()
		}
	})

	return widgetState
}

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
		try {
			assignEventHandlers('off', { onReady, onCustomerStatusChanged })
		} finally {
			unsubscribeInit?.()
			unsubscribeDestroy?.()
		}
	})

	return customerData
}

export function useWidgetChatData(): Ref<ChatData | null> {
	const chatData = ref<ChatData | null>(null)
	const customerData = useWidgetCustomerData()

	watch(
		() => customerData.value?.status,
		(status) => {
			if (status === 'chatting') {
				chatData.value = getData('chat')
			} else {
				chatData.value = null
			}
		},
	)

	return chatData
}

export function useWidgetGreeting(): Ref<Event['greeting'] | null> {
	const greeting = ref<Event['greeting'] | null>(null)
	let unsubscribeInit: VoidFunction | null = null
	let unsubscribeDestroy: VoidFunction | null = null

	const onGreetingDisplayed = (greetingData: Event['greeting']) => {
		greeting.value = greetingData
	}
	const onGreetingHidden = () => {
		greeting.value = null
	}

	onMounted(() => {
		unsubscribeInit = lcOnInit(() => {
			assignEventHandlers('on', { onGreetingDisplayed, onGreetingHidden })
		})
		unsubscribeDestroy = lcOnDestroy(() => {
			greeting.value = null
		})
	})
	onUnmounted(() => {
		try {
			assignEventHandlers('off', { onGreetingDisplayed, onGreetingHidden })
		} finally {
			unsubscribeInit?.()
			unsubscribeDestroy?.()
		}
	})

	return greeting
}
