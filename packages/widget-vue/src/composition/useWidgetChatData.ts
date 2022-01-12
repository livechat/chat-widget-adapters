import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import { getData } from '@livechat/widget-core'
import type { ChatData } from '@livechat/widget-core'

import { useWidgetCustomerData } from './useWidgetCustomerData'

export function useWidgetChatData(): Ref<ChatData | null> {
	const chatData = ref<ChatData | null>(null)
	const customerData = useWidgetCustomerData()

	watch(
		() => customerData.value?.status,
		(status) => {
			if (status === 'chatting') {
				chatData.value = getData('chat')
			} else {
				chatData.value = null
			}
		},
	)

	return chatData
}
