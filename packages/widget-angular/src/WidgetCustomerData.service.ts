import { BehaviorSubject } from 'rxjs'
import { Injectable, NgZone, OnDestroy } from '@angular/core'
import { lcOnInit, lcOnDestroy, assignEventHandlers, getData } from '@livechat/widget-core'
import type { CustomerData } from '@livechat/widget-core'

export type WidgetCustomerDataSubject = typeof WidgetCustomerDataService.prototype.subject

@Injectable()
export class WidgetCustomerDataService implements OnDestroy {
	private onDestroy: VoidFunction
	readonly subject = new BehaviorSubject<CustomerData | null>(null)

	constructor(private zone: NgZone) {
		const onReady = ({ customerData }: { customerData: CustomerData }) => this.setCustomerData(customerData)
		const onCustomerStatusChanged = () => this.setCustomerData(getData('customer'))

		const unsubscribeInit = lcOnInit(() => {
			assignEventHandlers('once', { onReady })
			assignEventHandlers('on', { onCustomerStatusChanged })
		})

		const unsubscribeDestroy = lcOnDestroy(() => {
			setTimeout(() => this.setCustomerData(null), 0)
		})

		this.onDestroy = () => {
			this.subject.complete()
			assignEventHandlers('off', { onReady, onCustomerStatusChanged })
			unsubscribeInit()
			unsubscribeDestroy()
		}
	}

	setCustomerData(data: CustomerData | null) {
		this.zone.run(() => this.subject.next(data))
	}

	ngOnDestroy() {
		this.onDestroy()
	}
}
