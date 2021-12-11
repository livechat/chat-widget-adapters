import { Component } from '@angular/core'
import {
	WidgetIsReadyService,
	WidgetStateService,
	WidgetCustomerDataService,
	WidgetChatDataService,
	WidgetGreetingService,
	EventHandlerPayload,
} from '@livechat/widget-angular'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styles: [],
})
export class AppComponent {
	group = '0'
	widgetIsReady: typeof WidgetIsReadyService.prototype.subject
	widgetState: typeof WidgetStateService.prototype.subject
	customerData: typeof WidgetCustomerDataService.prototype.subject
	chatData: typeof WidgetChatDataService.prototype.subject
	greeting: typeof WidgetGreetingService.prototype.subject

	constructor(
		widgetIsReadyService: WidgetIsReadyService,
		widgetStateService: WidgetStateService,
		widgetCustomerDataService: WidgetCustomerDataService,
		widgetChatDataService: WidgetChatDataService,
		widgetGreetingService: WidgetGreetingService,
	) {
		this.widgetIsReady = widgetIsReadyService.subject
		this.widgetState = widgetStateService.subject
		this.customerData = widgetCustomerDataService.subject
		this.chatData = widgetChatDataService.subject
		this.greeting = widgetGreetingService.subject
	}

	stringify(value: Parameters<typeof JSON.stringify>['0']) {
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
