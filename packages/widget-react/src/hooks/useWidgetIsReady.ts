import * as React from 'react'
import { lcOnInit, lcOnDestroy, assignEventHandlers } from '@livechat/widget-core'

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
