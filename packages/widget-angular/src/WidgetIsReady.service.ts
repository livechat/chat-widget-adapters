import { BehaviorSubject } from 'rxjs'
import { Injectable, NgZone, OnDestroy } from '@angular/core'
import { lcOnInit, lcOnDestroy, assignEventHandlers } from '@livechat/widget-core'

@Injectable()
export class WidgetIsReadyService implements OnDestroy {
	private onDestroy: VoidFunction
	readonly subject = new BehaviorSubject<boolean>(false)

	constructor(private zone: NgZone) {
		const onReady = () => this.setIsReady(true)
		const unsubscribeInit = lcOnInit(() => {
			assignEventHandlers('once', { onReady })
		})
		const unsubscribeDestroy = lcOnDestroy(() => {
			setTimeout(() => this.setIsReady(false), 0)
		})
		this.onDestroy = () => {
			try {
				assignEventHandlers('off', { onReady })
			} finally {
				unsubscribeInit()
				unsubscribeDestroy()
			}
		}
	}

	setIsReady(isReady: boolean) {
		this.zone.run(() => {
			this.subject.next(isReady)
		})
	}

	ngOnDestroy() {
		this.onDestroy()
	}
}
