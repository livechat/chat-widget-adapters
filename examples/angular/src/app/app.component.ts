import { Component, OnInit } from '@angular/core'
import {
	WidgetIsReadyService,
	WidgetStateService,
	WidgetCustomerDataService,
	WidgetChatDataService,
	WidgetGreetingService,
} from '@livechat/widget-angular'
import type {
	EventHandlerPayload,
	WidgetIsReadySubject,
	WidgetStateSubject,
	WidgetCustomerDataSubject,
	WidgetChatDataSubject,
	WidgetGreetingSubject,
} from '@livechat/widget-angular'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styles: [],
})
export class AppComponent implements OnInit {
	group = '0'
	widgetIsReady$: WidgetIsReadySubject
	widgetState$: WidgetStateSubject
	customerData$: WidgetCustomerDataSubject
	chatData$: WidgetChatDataSubject
	greeting$: WidgetGreetingSubject

	constructor(
		widgetIsReadyService: WidgetIsReadyService,
		widgetStateService: WidgetStateService,
		widgetCustomerDataService: WidgetCustomerDataService,
		widgetChatDataService: WidgetChatDataService,
		widgetGreetingService: WidgetGreetingService,
	) {
		this.widgetIsReady$ = widgetIsReadyService.subject
		this.widgetState$ = widgetStateService.subject
		this.customerData$ = widgetCustomerDataService.subject
		this.chatData$ = widgetChatDataService.subject
		this.greeting$ = widgetGreetingService.subject
	}

	ngOnInit(): void {
		this.chatData$.subscribe((value) => {
			console.log('AppComponent.ngOnInit.chatData', value)
		})
	}

	private stringify(value: Parameters<typeof JSON.stringify>['0']) {
		return JSON.stringify(value, null, 2)
	}

	handleNewEvent(event: EventHandlerPayload<'onNewEvent'>) {
		console.log('LiveChatWidget -> onNewEvent', this.stringify(event))
	}

	handleFormSubmitted(form: EventHandlerPayload<'onFormSubmitted'>) {
		console.log('LiveChatWidget -> onFormSubmitted', this.stringify(form))
	}

	handleRatingSubmitted(rating: EventHandlerPayload<'onRatingSubmitted'>) {
		console.log('LiveChatWidget -> onRatingSubmitted', this.stringify(rating))
	}

	handleChangeGroup() {
		this.group = this.group === '0' ? '1' : '0'
	}
}
