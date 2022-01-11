import * as React from 'react'
import { lcOnInit, lcOnDestroy, assignEventHandlers } from '@livechat/widget-core'
import type { WidgetState } from '@livechat/widget-core'

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
