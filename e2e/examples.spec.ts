import { expect, test } from '@playwright/test'
import { CustomerData, ChatData, WidgetState } from '@livechat/widget-core'
import { ExamplePage, MAP_FRAMEWORK_TO_PORT } from './example-page'
import { stringify } from './utils'

test.describe.parallel('Example applications', () => {
	Object.keys(MAP_FRAMEWORK_TO_PORT).forEach((framework: keyof typeof MAP_FRAMEWORK_TO_PORT) => {
		test(`${framework} should render Chat Widget with provided data and update state accordingly`, async ({ page }) => {
			const customerData: CustomerData = {
				name: 'John Doe',
				email: 'john.doe@example.com',
				isReturning: false,
				sessionVariables: {},
				id: null,
				status: 'browsing',
			}

			const widgetState: WidgetState = {
				availability: 'online',
				visibility: 'maximized',
			}

			let chatData: ChatData = null

			const examplePage = new ExamplePage(page, framework)
			await examplePage.goto()
			await examplePage.getWidgetIframe()

			customerData.id = examplePage.getServerCustomerId()
			await expect(examplePage.dataContainers.widgetIsReady).toHaveText('Widget is ready: true')
			await expect(examplePage.dataContainers.widgetState).toHaveText(`Widget state: ${stringify(widgetState)}`)
			await expect(examplePage.dataContainers.customerData).toHaveText(`Customer data: ${stringify(customerData)}`)
			await expect(examplePage.dataContainers.chatData).toHaveText(`Chat data: ${stringify(chatData)}`)

			const preChatFields = examplePage.getPreChatFields()
			await expect(preChatFields.emailInput).toHaveValue(customerData.email)
			await expect(preChatFields.nameInput).toHaveValue(customerData.name)

			await examplePage.startTheChat()
			customerData.status = 'chatting'
			chatData = examplePage.serverChat
			await expect(examplePage.dataContainers.chatData).toHaveText(`Chat data: ${stringify(chatData)}`)
			await expect(examplePage.dataContainers.customerData).toHaveText(`Customer data: ${stringify(customerData)}`)

			await examplePage.minimizeWidget()
			widgetState.visibility = 'minimized'
			await expect(examplePage.dataContainers.widgetState).toHaveText(`Widget state: ${stringify(widgetState)}`)
		})
	})
})
