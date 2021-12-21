# @livechat/widget-vue

> This library allows to render and interact with [LiveChat Chat Widget](https://developers.livechat.com/open-chat-widget/) inside [Vue 3](https://v3.vuejs.org/) application.

![](https://img.shields.io/badge/license-MIT-blue.svg)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![Check](https://github.com/livechat/chat-widget-adapters/actions/workflows/check.yml/badge.svg?branch=master)](https://github.com/livechat/chat-widget-adapters/actions/workflows/check.yml)

## Installation

Using npm:

```bash
npm install @livechat/widget-vue
```

or using yarn:

```bash
yarn add @livechat/widget-vue
```

## Usage

### Render

```html
<script lang="ts" setup>
  import { LiveChatWidget, EventHandlerPayload } from '@livechat/widget-vue'

  function handleNewEvent(event: EventHandlerPayload<'onNewEvent'>) {
    console.log('LiveChatWidget.onNewEvent', event)
  }
</script>

<template>
  <LiveChatWidget
    license="12345678"
    visibility="maximized"
    v-on:new-event="handleNewEvent"
  />
</template>
```

### Props

#### Config data

All properties described below are used for initialization on first render and later updates chat widget with new values on change.

| Prop              | Type                                   |
| ----------------- | -------------------------------------- |
| license           | string (required)                      |
| group             | string                                 |
| visibility        | string                                 |
| customerName      | string                                 |
| customerEmail     | string                                 |
| customerEmail     | string                                 |
| customerEmail     | string                                 |
| chatBetweenGroups | boolean                                |
| sessionVariables  | Record<string, string>                 |
| visibility        | 'maximized' \| 'minimized' \| 'hidden' |

#### Event handlers

All event handlers listed below are registered provided for the first time. They unregister on component cleanup or property value change. Each event description is available after clicking an associated link.

- [onReady](https://developers.livechat.com/docs/extending-chat-widget/javascript-api#on-ready)
- [onAvailabilityChanged](https://developers.livechat.com/docs/extending-chat-widget/javascript-api#on-availability-changed)
- [onVisibilityChanged](https://developers.livechat.com/docs/extending-chat-widget/javascript-api#on-visibility-changed)
- [onCustomerStatusChanged](https://developers.livechat.com/docs/extending-chat-widget/javascript-api#on-customer-status-changed)
- [onNewEvent](https://developers.livechat.com/docs/extending-chat-widget/javascript-api#on-new-event)
- [onFormSubmitted](https://developers.livechat.com/docs/extending-chat-widget/javascript-api#on-form-submitted)
- [onRatingSubmitted](https://developers.livechat.com/docs/extending-chat-widget/javascript-api#on-rating-submitted)
- [onGreetingDisplayed](https://developers.livechat.com/docs/extending-chat-widget/javascript-api#on-greeting-displayed)
- [onGreetingHidden](https://developers.livechat.com/docs/extending-chat-widget/javascript-api#on-greeting-hidden)
- [onRichMessageButtonClicked](https://developers.livechat.com/docs/extending-chat-widget/javascript-api#on-rich-message-button-clicked)

### Composition API

This package exports a set of [Vue Composition API](https://v3.vuejs.org/api/composition-api.html#composition-api) utilities that allow consuming reactive data from chat widget in any place of the application as long as the `LiveChatWidget` component is rendered in the tree.

#### useWidgetState

Access current chat widget `availability` or `visibility` state if the chat widget is loaded.

```html
<script setup>
  import { useWidgetState } from '@livechat/widget-vue'
  const widgetState = useWidgetState()
</script>

<template>
  <div v-if="widgetState">
    <span>{{widgetState.availability}}</span>
    <span>{{widgetState.visibility}}</span>
  </div>
</template>
```

#### useWidgetIsReady

Check if chat widget is ready using the boolean flag `isWidgetReady`.

```html
<script setup>
  import { useWidgetIsReady } from '@livechat/widget-vue'
  const isWidgetReady = useWidgetIsReady()
</script>

<template>
  <div>
    <span>Chat Widget is</span>
    <span v-if="isWidgetReady">loaded</span>
    <span v-else>loading...</span>
  </div>
</template>
```

#### useWidgetChatData

Access the `chatId` and `threadId` of the chat, if there is currently one available.

```html
<script setup>
  import { useWidgetChatData } from '@livechat/widget-vue'
  const chatData = useWidgetChatData()
</script>

<template>
  <div v-if="chatData">
    <span>{{chatData.chatId}}</span>
    <span>{{chatData.threadId}}</span>
  </div>
</template>
```

#### useWidgetGreeting

Access current greeting `id` and `uniqueId` if one is currently displayed (received and not hidden).

```html
<script setup>
  import { useWidgetGreeting } from '@livechat/widget-vue'
  const greeting = useWidgetGreeting()
</script>

<template>
  <div v-if="greeting">
    <span>{{greeting.id}}</span>
    <span>{{greeting.uniqueId}}</span>
  </div>
</template>
```

#### useWidgetCustomerData

Access the `id`, `isReturning`, `status`, and `sessionVariables` of the current customer, if the chat widget is loaded.

```html
<script setup>
  import { useWidgetCustomerData } from '@livechat/widget-vue'
  const customerData = useWidgetCustomerData()
</script>

<template>
  <div v-if="customerData">
    <span>{{customerData.id}}</span>
    <span>{{customerData.isReturning}}</span>
    <span>{{customerData.status}}</span>
    <ul>
      <li v-for="variable in customerData.sessionVariables">{{variable}}</li>
    </ul>
  </div>
</template>
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Follow a [Contributing guide](https://github.com/livechat/chat-widget-adapters#-contributing) for more detials.

## License

[MIT](https://choosealicense.com/licenses/mit/)
