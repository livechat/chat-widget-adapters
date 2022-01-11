import * as React from 'react'
import { getData } from '@livechat/widget-core'
import type { ChatData } from '@livechat/widget-core'

import { useWidgetCustomerData } from './useWidgetCustomerData'

export function useWidgetChatData(): ChatData | null {
	const customerData = useWidgetCustomerData()
	const status = customerData?.status
	const [chatData, setChatData] = React.useState<ChatData | null>(null)

	React.useEffect(() => {
		if (status === 'chatting') {
			setChatData(getData('chat'))
		} else {
			setChatData(null)
		}
	}, [status])

	return chatData
}
