import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { createWidget } from '@livechat/widget-core'
import type { ExtendedWindow, WidgetInstance, WidgetConfig, CustomerData, WidgetState } from '@livechat/widget-core'

declare const window: ExtendedWindow

export const LiveChatWidget = defineComponent({
	props: {
		license: {
			type: Object as PropType<WidgetConfig['license']>,
			required: true,
		},
		group: {
			type: Object as PropType<WidgetConfig['group']>,
			required: false,
			default: undefined,
		},
		visibility: {
			type: Object as PropType<WidgetConfig['visibility']>,
			required: false,
			default: undefined,
		},
		customerName: {
			type: Object as PropType<WidgetConfig['customerName']>,
			required: false,
			default: undefined,
		},
		customerEmail: {
			type: Object as PropType<WidgetConfig['customerEmail']>,
			required: false,
			default: undefined,
		},
		sessionVariables: {
			type: Object as PropType<WidgetConfig['sessionVariables']>,
			required: false,
			default: undefined,
		},
		chatBetweenGroups: {
			type: Object as PropType<WidgetConfig['chatBetweenGroups']>,
			required: false,
			default: undefined,
		},
	},
	data(): { widget: WidgetInstance | null } {
		return {
			widget: null,
		}
	},
	watch: {
		license: 'reinitialize',
		group: 'reinitialize',
		chatBetweenGroups: 'reinitialize',
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
			const emit = this.$emit
			this.widget = createWidget({
				group: this.group,
				license: this.license,
				visibility: this.visibility,
				customerName: this.customerName,
				customerEmail: this.customerEmail,
				sessionVariables: this.sessionVariables,
				chatBetweenGroups: this.chatBetweenGroups,
				onReady: (data) => emit('ready', data),
				onNewEvent: (event) => emit('new-event', event),
				onFormSubmitted: (form) => emit('form-submitted', form),
				onRatingSubmitted: (rating) => emit('rating-submitted', rating),
				onGreetingHidden: (greeting) => emit('greeting-hidden', greeting),
				onGreetingDisplayed: (greeting) => emit('greeting-displayed', greeting),
				onVisibilityChanged: (visibility) => emit('visibility-changed', visibility),
				onCustomerStatusChanged: (status) => emit('customer-status-changed', status),
				onRichMessageButtonClicked: (button) => emit('rich-message-button-clicked', button),
				onAvailabilityChanged: (availability) => emit('availability-changed', availability),
			})
			window.__lc.integration_name = process.env.PACKAGE_NAME
			this.widget.init()
		},
		reinitialize() {
			this.widget?.destroy()
			this.setupWidget()
		},
	},
})
