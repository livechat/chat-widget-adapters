import * as React from 'react'

import { LiveChatWidget } from '@livechat/widget-react'

export function App() {
	return (
		<main>
			<h1>Hello React!</h1>
			<LiveChatWidget license="12332502" group="0" />
		</main>
	)
}
