export * from './services'
export { LiveChatWidgetModule } from './LiveChatWidget.module'
export { LiveChatWidgetComponent, TextWidgetComponent } from './LiveChatWidget.component'

export type {
	ChatEvent,
	ChatData,
	WidgetConfig,
	WidgetState,
	CustomerData,
	RichMessageButton,
	EventHandlerPayload,
} from '@livechat/widget-core'
