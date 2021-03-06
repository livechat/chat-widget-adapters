import * as React from 'react'
import {
	LiveChatWidget,
	useWidgetState,
	useWidgetIsReady,
	useWidgetChatData,
	useWidgetGreeting,
	useWidgetCustomerData,
} from '@livechat/widget-react'

function stringify(value: Parameters<typeof JSON.stringify>['0']) {
	return JSON.stringify(value, null, 2)
}

export function App() {
	const [group, setGroup] = React.useState<'0' | '1'>('0')
	const chatData = useWidgetChatData()
	const greeting = useWidgetGreeting()
	const widgetState = useWidgetState()
	const isWidgetReady = useWidgetIsReady()
	const customerData = useWidgetCustomerData()

	return (
		<main>
			<h1>Hello React!</h1>
			<button
				type="button"
				disabled={!isWidgetReady}
				onClick={() => setGroup((prevGroup) => (prevGroup === '0' ? '1' : '0'))}
			>
				Change group
			</button>
			<pre id="widget-readiness">Widget is ready: {stringify(isWidgetReady)}</pre>
			<pre id="widget-state">Widget state: {stringify(widgetState)}</pre>
			<pre id="customer-data">Customer data: {stringify(customerData)}</pre>
			<pre id="chat-data">Chat data: {stringify(chatData)}</pre>
			<pre id="greeting">Greeting: {stringify(greeting)}</pre>
			<LiveChatWidget
				license="12332502"
				group={group}
				visibility="maximized"
				customerName="John Doe"
				customerEmail="john.doe@example.com"
				onNewEvent={(event) => console.log('LiveChatWidget -> onNewEvent', stringify(event))}
				onFormSubmitted={(form) => console.log('LiveChatWidget -> onFormSubmitted', stringify(form))}
				onRatingSubmitted={(rating) => console.log('LiveChatWidget -> onRatingSubmitted', stringify(rating))}
			/>
		</main>
	)
}
