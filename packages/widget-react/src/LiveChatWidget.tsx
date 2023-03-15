import * as React from 'react'
import { createWidget } from '@livechat/widget-core'
import type { ExtendedWindow, WidgetConfig, WidgetInstance } from '@livechat/widget-core'

declare const window: ExtendedWindow

export function LiveChatWidget(props: WidgetConfig) {
	const widgetRef = React.useRef<WidgetInstance | null>(null)

	React.useEffect(() => {
		widgetRef.current = createWidget(props)
		window.__lc.integration_name = process.env.PACKAGE_NAME
		widgetRef.current.init()
		return () => {
			widgetRef.current?.destroy()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.license, props.group, props.chatBetweenGroups, props.customIdentityProvider])

	React.useEffect(() => {
		widgetRef.current?.updateVisibility(props.visibility)
	}, [props.visibility])

	React.useEffect(() => {
		widgetRef.current?.updateSessionVariables(props.sessionVariables)
	}, [props.sessionVariables])

	React.useEffect(() => {
		widgetRef.current?.updateCustomerData({
			name: props.customerName,
			email: props.customerEmail,
		})
	}, [props.customerName, props.customerEmail])

	React.useEffect(() => {
		widgetRef.current?.updateEventHandlers({
			...(props.onReady && { onReady: props.onReady }),
			...(props.onNewEvent && { onNewEvent: props.onNewEvent }),
			...(props.onFormSubmitted && { onFormSubmitted: props.onFormSubmitted }),
			...(props.onGreetingHidden && { onGreetingHidden: props.onGreetingHidden }),
			...(props.onRatingSubmitted && { onRatingSubmitted: props.onRatingSubmitted }),
			...(props.onGreetingDisplayed && { onGreetingDisplayed: props.onGreetingDisplayed }),
			...(props.onVisibilityChanged && { onVisibilityChanged: props.onVisibilityChanged }),
			...(props.onAvailabilityChanged && { onAvailabilityChanged: props.onAvailabilityChanged }),
			...(props.onCustomerStatusChanged && { onCustomerStatusChanged: props.onCustomerStatusChanged }),
			...(props.onRichMessageButtonClicked && { onRichMessageButtonClicked: props.onRichMessageButtonClicked }),
		})
	}, [
		props.onReady,
		props.onNewEvent,
		props.onFormSubmitted,
		props.onGreetingHidden,
		props.onRatingSubmitted,
		props.onGreetingDisplayed,
		props.onVisibilityChanged,
		props.onAvailabilityChanged,
		props.onCustomerStatusChanged,
		props.onRichMessageButtonClicked,
	])

	return null
}
