import { Component, Directive, Input, Output, OnInit, OnDestroy, OnChanges, EventEmitter } from '@angular/core'
import { createWidget } from '@livechat/widget-core'
import type {
	ExtendedWindow,
	WidgetInstance,
	WidgetConfig,
	EventHandlerPayload,
	ProductName,
} from '@livechat/widget-core'

declare const window: ExtendedWindow

type Changes = Partial<{
	[key in keyof WidgetConfig]: {
		firstChange: boolean
		previousValue: WidgetConfig[key]
		currentValue: WidgetConfig[key]
		isFirstChange(): boolean
	}
}>

@Directive()
abstract class BaseWidgetComponent implements OnInit, OnDestroy, OnChanges {
	@Input() license: WidgetConfig['license']
	@Input() organizationId: WidgetConfig['organizationId']
	@Input() group: WidgetConfig['group']
	@Input() visibility: WidgetConfig['visibility']
	@Input() customerName: WidgetConfig['customerName']
	@Input() customerEmail: WidgetConfig['customerEmail']
	@Input() sessionVariables: WidgetConfig['sessionVariables']
	@Input() chatBetweenGroups: WidgetConfig['chatBetweenGroups']
	@Input() customIdentityProvider: WidgetConfig['customIdentityProvider']

	@Output() onReady = new EventEmitter<EventHandlerPayload<'onReady'>>()
	@Output() onNewEvent = new EventEmitter<EventHandlerPayload<'onNewEvent'>>()
	@Output() onFormSubmitted = new EventEmitter<EventHandlerPayload<'onFormSubmitted'>>()
	@Output() onRatingSubmitted = new EventEmitter<EventHandlerPayload<'onRatingSubmitted'>>()
	@Output() onGreetingHidden = new EventEmitter<EventHandlerPayload<'onGreetingHidden'>>()
	@Output() onGreetingDisplayed = new EventEmitter<EventHandlerPayload<'onGreetingDisplayed'>>()
	@Output() onVisibilityChanged = new EventEmitter<EventHandlerPayload<'onVisibilityChanged'>>()
	@Output() onCustomerStatusChanged = new EventEmitter<EventHandlerPayload<'onCustomerStatusChanged'>>()
	@Output() onRichMessageButtonClicked = new EventEmitter<EventHandlerPayload<'onRichMessageButtonClicked'>>()
	@Output() onAvailabilityChanged = new EventEmitter<EventHandlerPayload<'onAvailabilityChanged'>>()

	widget: WidgetInstance | null = null
	protected abstract product: ProductName

	ngOnInit() {
		this.setupWidget()
	}

	ngOnChanges(changes: Changes) {
		const fullReloadProps: Array<keyof WidgetConfig> = ['license', 'organizationId', 'group', 'chatBetweenGroups']
		if (fullReloadProps.some((prop) => changes[prop] !== undefined && !changes[prop]?.isFirstChange())) {
			this.reinitialize()
			return
		}

		if (changes.visibility !== undefined && !changes.visibility.isFirstChange()) {
			this.widget?.updateVisibility(changes.visibility.currentValue)
		}
		if (changes.customerName !== undefined && !changes.customerName.isFirstChange()) {
			this.widget?.updateCustomerData({ name: changes.customerName.currentValue })
		}
		if (changes.customerEmail !== undefined && !changes.customerEmail.isFirstChange()) {
			this.widget?.updateCustomerData({ email: changes.customerEmail.currentValue })
		}
		if (changes.sessionVariables !== undefined && !changes.sessionVariables.isFirstChange()) {
			this.widget?.updateSessionVariables(changes.sessionVariables.currentValue)
		}
	}

	ngOnDestroy() {
		this.widget?.destroy()
	}

	setupWidget() {
		this.widget = createWidget({
			group: this.group,
			license: this.license,
			organizationId: this.organizationId,
			visibility: this.visibility,
			customerName: this.customerName,
			customerEmail: this.customerEmail,
			sessionVariables: this.sessionVariables,
			chatBetweenGroups: this.chatBetweenGroups,
			customIdentityProvider: this.customIdentityProvider,
			onReady: (data) => this.onReady.emit(data),
			onNewEvent: (event) => this.onNewEvent.emit(event),
			onFormSubmitted: (form) => this.onFormSubmitted.emit(form),
			onRatingSubmitted: (rating) => this.onRatingSubmitted.emit(rating),
			onGreetingHidden: (greeting) => this.onGreetingHidden.emit(greeting),
			onGreetingDisplayed: (greeting) => this.onGreetingDisplayed.emit(greeting),
			onVisibilityChanged: (visibility) => this.onVisibilityChanged.emit(visibility),
			onCustomerStatusChanged: (status) => this.onCustomerStatusChanged.emit(status),
			onRichMessageButtonClicked: (button) => this.onRichMessageButtonClicked.emit(button),
			onAvailabilityChanged: (availability) => this.onAvailabilityChanged.emit(availability),
		})
		window.__lc.integration_name = process.env.PACKAGE_NAME
		if (this.product === 'textapp') {
			window.__lc.product_name = 'text'
		}
		this.widget.init()
	}

	reinitialize() {
		this.widget?.destroy()
		this.setupWidget()
	}
}

@Component({
	selector: 'livechat-widget',
	template: '',
	styles: [],
})
export class LiveChatWidgetComponent extends BaseWidgetComponent {
	protected product: ProductName = 'livechat'
}

@Component({
	selector: 'text-widget',
	template: '',
	styles: [],
})
export class TextWidgetComponent extends BaseWidgetComponent {
	protected product: ProductName = 'textapp'
}
