import { BehaviorSubject } from 'rxjs'
import { Injectable, NgZone, OnDestroy } from '@angular/core'
import { lcOnInit, lcOnDestroy, assignEventHandlers } from '@livechat/widget-core'
import type { Greeting } from '@livechat/widget-core'

export type WidgetGreetingSubject = typeof WidgetGreetingService.prototype.subject

@Injectable()
export class WidgetGreetingService implements OnDestroy {
	private onDestroy: VoidFunction
	readonly subject = new BehaviorSubject<Greeting | null>(null)

	constructor(private zone: NgZone) {
		const onGreetingDisplayed = (greeting: Greeting) => this.setGreeting(greeting)
		const onGreetingHidden = () => this.setGreeting(null)

		const unsubscribeInit = lcOnInit(() => {
			assignEventHandlers('on', { onGreetingDisplayed, onGreetingHidden })
		})
		const unsubscribeDestroy = lcOnDestroy(() => {
			setTimeout(() => this.setGreeting(null), 0)
		})
		this.onDestroy = () => {
			this.subject.complete()
			assignEventHandlers('off', { onGreetingDisplayed, onGreetingHidden })
			unsubscribeInit()
			unsubscribeDestroy()
		}
	}

	setGreeting(greeting: Greeting | null) {
		this.zone.run(() => {
			this.subject.next(greeting)
		})
	}

	ngOnDestroy() {
		this.onDestroy()
	}
}
