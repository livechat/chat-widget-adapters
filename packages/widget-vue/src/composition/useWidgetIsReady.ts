import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import { lcOnInit, lcOnDestroy, assignEventHandlers } from '@livechat/widget-core'

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
		assignEventHandlers('off', { onReady })
		unsubscribeInit?.()
		unsubscribeDestroy?.()
	})

	return isReady
}
