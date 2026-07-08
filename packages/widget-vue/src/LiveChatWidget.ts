import { defineComponent } from 'vue'
import type { DefineComponent, ComponentOptionsMixin } from 'vue'
import { createWidget } from '@livechat/widget-core'
import type {
	ExtendedWindow,
	WidgetInstance,
	WidgetConfig,
	CustomerData,
	WidgetState,
	ProductName,
} from '@livechat/widget-core'

declare const window: ExtendedWindow

type EmitEvent =
	| 'ready'
	| 'new-event'
	| 'form-submitted'
	| 'rating-submitted'
	| 'greeting-hidden'
	| 'greeting-displayed'
	| 'visibility-changed'
	| 'customer-status-changed'
	| 'rich-message-button-clicked'
	| 'availability-changed'

// `env` is internal-only, so it's kept out of PublicProps and cast away below despite being a real runtime prop.
type PublicProps = {
	license?: string
	organizationId?: string
	group?: string
	visibility?: string
	customerName?: string
	customerEmail?: string
	sessionVariables?: Record<string, string>
	chatBetweenGroups?: boolean
	customIdentityProvider?: WidgetConfig['customIdentityProvider']
}

type PublicWidgetComponent = DefineComponent<
	PublicProps,
	unknown,
	{ widget: WidgetInstance | null },
	Record<never, never>,
	{ setupWidget(): void; reinitialize(): void },
	ComponentOptionsMixin,
	ComponentOptionsMixin,
	EmitEvent[],
	EmitEvent
>

export const TextWidget = defineWidget('textapp')

export const LiveChatWidget = defineWidget('livechat')

function defineWidget(product: ProductName) {
	const component = defineComponent({
		props: {
			license: {
				type: String,
				required: false,
				default: undefined,
			},
			organizationId: {
				type: String,
				required: false,
				default: undefined,
			},
			group: {
				type: String,
				required: false,
				default: undefined,
			},
			visibility: {
				type: String,
				required: false,
				default: undefined,
			},
			customerName: {
				type: String,
				required: false,
				default: undefined,
			},
			customerEmail: {
				type: String,
				required: false,
				default: undefined,
			},
			sessionVariables: {
				type: Object,
				required: false,
				default: undefined,
			},
			chatBetweenGroups: {
				type: Boolean,
				required: false,
				default: undefined,
			},
			customIdentityProvider: {
				type: Function,
				required: false,
				default: undefined,
			},
			env: {
				type: String,
				required: false,
				default: undefined,
			},
		},
		emits: [
			'ready',
			'new-event',
			'form-submitted',
			'rating-submitted',
			'greeting-hidden',
			'greeting-displayed',
			'visibility-changed',
			'customer-status-changed',
			'rich-message-button-clicked',
			'availability-changed',
		],
		data(): { widget: WidgetInstance | null } {
			return {
				widget: null,
			}
		},
		watch: {
			license: 'reinitialize',
			organizationId: 'reinitialize',
			group: 'reinitialize',
			chatBetweenGroups: 'reinitialize',
			env: 'reinitialize',

			visibility(visibility: WidgetState['visibility']) {
				this.widget?.updateVisibility(visibility)
			},
			customerName(name: CustomerData['name']) {
				this.widget?.updateCustomerData({ name })
			},
			customerEmail(email: CustomerData['email']) {
				this.widget?.updateCustomerData({ email })
			},
			sessionVariables(sessionVariables: CustomerData['sessionVariables']) {
				this.widget?.updateSessionVariables(sessionVariables)
			},
		},
		mounted() {
			this.setupWidget()
		},
		unmounted() {
			this.widget?.destroy()
		},
		methods: {
			setupWidget() {
				const config: WidgetConfig & { env?: string } = {
					group: this.group,
					license: this.license,
					organizationId: this.organizationId,
					customerName: this.customerName,
					customerEmail: this.customerEmail,
					sessionVariables: this.sessionVariables,
					chatBetweenGroups: this.chatBetweenGroups,
					visibility: this.visibility as WidgetConfig['visibility'],
					customIdentityProvider: this.customIdentityProvider as WidgetConfig['customIdentityProvider'],
					env: this.env,
					onReady: (data) => this.$emit('ready', data),
					onNewEvent: (event) => this.$emit('new-event', event),
					onFormSubmitted: (form) => this.$emit('form-submitted', form),
					onRatingSubmitted: (rating) => this.$emit('rating-submitted', rating),
					onGreetingHidden: (greeting) => this.$emit('greeting-hidden', greeting),
					onGreetingDisplayed: (greeting) => this.$emit('greeting-displayed', greeting),
					onVisibilityChanged: (visibility) => this.$emit('visibility-changed', visibility),
					onCustomerStatusChanged: (status) => this.$emit('customer-status-changed', status),
					onRichMessageButtonClicked: (button) => this.$emit('rich-message-button-clicked', button),
					onAvailabilityChanged: (availability) => this.$emit('availability-changed', availability),
				}
				this.widget = createWidget(config)
				window.__lc.integration_name = process.env.PACKAGE_NAME
				if (product === 'textapp') {
					window.__lc.product_name = 'text'
				}
				this.widget.init()
			},
			reinitialize() {
				this.widget?.destroy()
				this.setupWidget()
			},
		},
		render() {
			return null
		},
	})

	return component as PublicWidgetComponent
}
