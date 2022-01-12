import { BehaviorSubject } from 'rxjs'
import { Injectable, NgZone, OnDestroy } from '@angular/core'
import { lcOnInit, lcOnDestroy, assignEventHandlers } from '@livechat/widget-core'
import type { WidgetState } from '@livechat/widget-core'

export type WidgetStateSubject = typeof WidgetStateService.prototype.subject

@Injectable()
export class WidgetStateService implements OnDestroy {
	private onDestroy: VoidFunction
	readonly subject = new BehaviorSubject<WidgetState | null>(null)

	constructor(private zone: NgZone) {
		const onReady = ({ state }: { state: WidgetState }) => this.setWidgetState(state)
		const onVisibilityChanged = ({ visibility }: Pick<WidgetState, 'visibility'>) => {
			const prevValue = this.subject.getValue()
			this.setWidgetState(prevValue ? { ...prevValue, visibility } : prevValue)
		}
		const onAvailabilityChanged = ({ availability }: Pick<WidgetState, 'availability'>) => {
			const prevValue = this.subject.getValue()
			this.setWidgetState(prevValue ? { ...prevValue, availability } : prevValue)
		}

		const unsubscribeInit = lcOnInit(() => {
			assignEventHandlers('once', { onReady })
			assignEventHandlers('on', { onVisibilityChanged, onAvailabilityChanged })
		})

		const unsubscribeDestroy = lcOnDestroy(() => {
			setTimeout(() => this.setWidgetState(null), 0)
		})

		this.onDestroy = () => {
			this.subject.complete()
			this.subject.unsubscribe()
			assignEventHandlers('off', { onReady, onVisibilityChanged, onAvailabilityChanged })
			unsubscribeInit()
			unsubscribeDestroy()
		}
	}

	setWidgetState(widgetState: WidgetState | null) {
		this.zone.run(() => {
			this.subject.next(widgetState)
		})
	}

	ngOnDestroy() {
		this.onDestroy()
	}
}
