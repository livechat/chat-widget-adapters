import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import { lcOnInit, lcOnDestroy, assignEventHandlers } from '@livechat/widget-core'
import type { WidgetState } from '@livechat/widget-core'

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
		assignEventHandlers('off', { onReady, onVisibilityChanged, onAvailabilityChanged })
		unsubscribeInit?.()
		unsubscribeDestroy?.()
	})

	return widgetState
}
