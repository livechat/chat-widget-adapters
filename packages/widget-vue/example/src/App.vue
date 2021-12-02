<template>
  <main>
    <h1>Hello Vue!</h1>
    <pre>Widget is ready: {{stringify(isWidgetReady)}}</pre>
    <pre>Widget state: {{stringify(widgetState)}}</pre>
    <pre>Customer data: {{stringify(customerData)}}</pre>
    <pre>Chat data: {{stringify(chatData)}}</pre>
    <pre>Greeting: {{stringify(greeting)}}</pre>
    <LiveChatWidget
      license="12332502"
      group="0"
      visibility="maximized"
			customerName="John Doe"
			customerEmail="joh.doe@example.com"
      v-on:new-event="handleNewEvent"
      v-on:form-submitted="handleFormSubmitted"
      v-on:rating-submitted="handleRatingSubmitted"
    />
  </main>
</template>
<script lang="ts">
import {
  LiveChatWidget,
	useWidgetState,
	useWidgetIsReady,
	useWidgetChatData,
	useWidgetGreeting,
	useWidgetCustomerData,
} from '@livechat/widget-vue'

export default {
  setup() {
    const chatData = useWidgetChatData()
    const greeting = useWidgetGreeting()
    const widgetState = useWidgetState()
    const isWidgetReady = useWidgetIsReady()
    const customerData = useWidgetCustomerData()

    return {
      chatData,
      greeting,
      widgetState,
      isWidgetReady,
      customerData
    }
  },
  components: {
    LiveChatWidget
  },
  methods: {
    stringify(value) {
      return JSON.stringify(value, null, 2)
    },
    handleNewEvent(event) {
      console.log('LiveChatWidget -> onNewEvent', this.stringify(event))
    },
    handleFormSubmitted(form) {
      console.log('LiveChatWidget -> onFormSubmitted', this.stringify(form))
    },
    handleRatingSubmitted(rating) {
      console.log('LiveChatWidget -> onRatingSubmitted', this.stringify(rating))
    }
  }
}
</script>