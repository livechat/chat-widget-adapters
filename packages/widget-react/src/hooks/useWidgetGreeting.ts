import * as React from 'react'
import { lcOnInit, lcOnDestroy, assignEventHandlers } from '@livechat/widget-core'
import type { Greeting } from '@livechat/widget-core'

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
