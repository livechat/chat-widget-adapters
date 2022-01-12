import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import { lcOnInit, lcOnDestroy, assignEventHandlers } from '@livechat/widget-core'
import type { Greeting } from '@livechat/widget-core'

export function useWidgetGreeting(): Ref<Greeting | null> {
	const greeting = ref<Greeting | null>(null)
	let unsubscribeInit: VoidFunction | null = null
	let unsubscribeDestroy: VoidFunction | null = null

	const onGreetingDisplayed = (greetingData: Greeting) => {
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
		assignEventHandlers('off', { onGreetingDisplayed, onGreetingHidden })
		unsubscribeInit?.()
		unsubscribeDestroy?.()
	})

	return greeting
}
