import { Frame, Locator, Page } from '@playwright/test'
import { ChatData } from '@livechat/widget-core'
import { matchFrame } from './utils'

export const MAP_FRAMEWORK_TO_PORT = {
	React: '3001',
	Vue: '3002',
	Angular: '3003',
} as const

export class ExamplePage {
	serverChat: null | ChatData = null

	readonly dataContainers: {
		chatData: Locator
		customerData: Locator
		widgetIsReady: Locator
		widgetState: Locator
	}

	private widgetIframeId = '#chat-widget'
	private sentFrames: string[] = []
	private receivedFrames: string[] = []
	private widgetFrame: Frame

	constructor(private page: Page, private framework: keyof typeof MAP_FRAMEWORK_TO_PORT) {
		this.dataContainers = {
			chatData: page.locator('#chat-data'),
			customerData: page.locator('#customer-data'),
			widgetIsReady: page.locator('#widget-readiness'),
			widgetState: page.locator('#widget-state'),
		}
	}

	async goto() {
		this.page.on('websocket', (ws) => {
			ws.on('framesent', (event) => this.sentFrames.push(event.payload as string))
			ws.on('framereceived', (event) => this.receivedFrames.push(event.payload as string))
		})

		await this.page.goto(`http://localhost:${MAP_FRAMEWORK_TO_PORT[this.framework]}`)
		await this.page.waitForSelector(`text=Hello ${this.framework}!`, { state: 'visible' })
	}

	async getWidgetIframe() {
		await this.page.waitForSelector(this.widgetIframeId)

		const elementHandle = await this.page.$(this.widgetIframeId)
		this.widgetFrame = await elementHandle.contentFrame()
	}

	async openChatView() {
		await this.widgetFrame.locator('text=Chat now').click()
	}

	async startTheChat() {
		const startTheChatButton = await this.widgetFrame.waitForSelector('text=Start the chat', {
			state: 'visible',
		})

		await startTheChatButton.click()

		await this.widgetFrame.waitForSelector('text=Hello. How may I help you?', {
			state: 'visible',
		})

		const serverChat = matchFrame(this.receivedFrames, new RegExp(/incoming_chat/)).payload.chat
		this.serverChat = {
			chatId: serverChat.id,
			threadId: serverChat.thread.id,
		}
	}

	async minimizeWidget() {
		await this.widgetFrame.locator('[aria-label="Minimize window"]').click()
	}

	getPreChatFields() {
		return {
			emailInput: this.widgetFrame.locator('#email'),
			nameInput: this.widgetFrame.locator('#name'),
		}
	}

	getServerCustomerId() {
		return matchFrame(this.receivedFrames, new RegExp(/login/)).payload.customer_id
	}
}
