import * as React from 'react'
import { createWidget } from '@livechat/widget-core'

type Props = {
	license: string
	group: string
	env?: string
}

export function LiveChatWidget({ license, group, env }: Props) {
	React.useEffect(() => {
		const destroy = createWidget({ license, group, env })
		return () => {
			destroy()
		}
	}, [license, group, env])

	return null
}
