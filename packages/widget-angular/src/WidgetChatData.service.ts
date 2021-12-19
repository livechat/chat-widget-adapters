import { BehaviorSubject } from 'rxjs'
import { Injectable, NgZone, OnDestroy } from '@angular/core'
import { getData } from '@livechat/widget-core'
import type { ChatData } from '@livechat/widget-core'

import type { WidgetCustomerDataService } from './WidgetCustomerData.service'

@Injectable()
export class WidgetChatDataService implements OnDestroy {
	private onDestroy: VoidFunction
	readonly subject = new BehaviorSubject<ChatData | null>(null)

	constructor(private zone: NgZone, widgetCustomerDataService: WidgetCustomerDataService) {
		const subscribtion = widgetCustomerDataService.subject.subscribe((customerData) => {
			const status = customerData?.status
			if (status === 'chatting') {
				this.setChatData(getData('chat'))
			} else {
				this.setChatData(null)
			}
		})

		this.onDestroy = () => {
			subscribtion.unsubscribe()
		}
	}

	setChatData(data: ChatData | null) {
		this.zone.run(() => {
			this.subject.next(data)
		})
	}

	ngOnDestroy() {
		this.onDestroy()
	}
}
