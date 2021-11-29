import { ref, watch, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import { assignEventHandlers, getData } from '@livechat/widget-core'
import type { WidgetState, CustomerData, ChatData, Event } from '@livechat/widget-core'

export function useWidgetIsReady(): Ref<boolean> {
	const isReady = ref(false)

	const onReady = () => {
		isReady.value = true
	}

	onMounted(() => {
		assignEventHandlers('once', { onReady })
	})
	onUnmounted(() => {
		assignEventHandlers('off', { onReady })
	})

	return isReady
}

export function useWidgetState(): Ref<WidgetState | null> {
	const widgetState = ref<WidgetState | null>(null)

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
		assignEventHandlers('once', { onReady })
		assignEventHandlers('on', { onVisibilityChanged, onAvailabilityChanged })
	})
	onUnmounted(() => {
		assignEventHandlers('off', { onReady, onVisibilityChanged, onAvailabilityChanged })
	})

	return widgetState
}

export function useWidgetCustomerData(): Ref<CustomerData | null> {
	const customerData = ref<CustomerData | null>(null)

	const onReady = (payload: { customerData: CustomerData }) => {
		customerData.value = payload.customerData
	}
	const onCustomerStatusChanged = () => {
		customerData.value = getData('customer')
	}

	onMounted(() => {
		assignEventHandlers('once', { onReady })
		assignEventHandlers('on', { onCustomerStatusChanged })
	})
	onUnmounted(() => {
		assignEventHandlers('off', { onReady, onCustomerStatusChanged })
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

	const onGreetingDisplayed = (greetingData: Event['greeting']) => {
		greeting.value = greetingData
	}
	const onGreetingHidden = () => {
		greeting.value = null
	}

	onMounted(() => {
		assignEventHandlers('on', { onGreetingDisplayed, onGreetingHidden })
	})
	onUnmounted(() => {
		assignEventHandlers('off', { onGreetingDisplayed, onGreetingHidden })
	})

	return greeting
}
