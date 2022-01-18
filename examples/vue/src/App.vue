<template>
  <main>
    <h1>Hello Vue!</h1>
    <button type="button" :disabled="!isWidgetReady" v-on:click="handleChangeGroup">Change group</button>
    <pre id="widget-readiness">Widget is ready: {{stringify(isWidgetReady)}}</pre>
    <pre id="widget-state">Widget state: {{stringify(widgetState)}}</pre>
    <pre id="customer-data">Customer data: {{stringify(customerData)}}</pre>
    <pre id="chat-data">Chat data: {{stringify(chatData)}}</pre>
    <pre id="greeting">Greeting: {{stringify(greeting)}}</pre>
    <LiveChatWidget
      license="12332502"
      :group="group"
      visibility="maximized"
			customerName="John Doe"
			customerEmail="john.doe@example.com"
      v-on:new-event="handleNewEvent"
      v-on:form-submitted="handleFormSubmitted"
      v-on:rating-submitted="handleRatingSubmitted"
    />
  </main>
</template>
<script lang="ts">
import { ref } from 'vue'
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
    const group = ref<'0' | '1'>('0')
    const chatData = useWidgetChatData()
    const greeting = useWidgetGreeting()
    const widgetState = useWidgetState()
    const isWidgetReady = useWidgetIsReady()
    const customerData = useWidgetCustomerData()

    return {
      group,
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
    handleChangeGroup() {
      this.group = this.group === '0' ? '1' : '0'
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
