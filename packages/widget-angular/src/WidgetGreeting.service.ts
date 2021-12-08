import { BehaviorSubject } from 'rxjs'
import { Injectable, NgZone, OnDestroy } from '@angular/core'
import { lcOnInit, lcOnDestroy, assignEventHandlers } from '@livechat/widget-core'
import type { Event } from '@livechat/widget-core'

@Injectable()
export class WidgetGreetingService implements OnDestroy {
	private onDestroy: VoidFunction
	readonly subject = new BehaviorSubject<Event['greeting'] | null>(null)

	constructor(private zone: NgZone) {
		const onGreetingDisplayed = (greeting: Event['greeting']) => this.setGreeting(greeting)
		const onGreetingHidden = () => this.setGreeting(null)

		const unsubscribeInit = lcOnInit(() => {
			assignEventHandlers('on', { onGreetingDisplayed, onGreetingHidden })
		})
		const unsubscribeDestroy = lcOnDestroy(() => {
			setTimeout(() => this.setGreeting(null), 0)
		})
		this.onDestroy = () => {
			try {
				assignEventHandlers('off', { onGreetingDisplayed, onGreetingHidden })
			} finally {
				unsubscribeInit()
				unsubscribeDestroy()
			}
		}
	}

	setGreeting(greeting: Event['greeting'] | null) {
		this.zone.run(() => {
			this.subject.next(greeting)
		})
	}

	ngOnDestroy() {
		this.onDestroy()
	}
}
