# @livechat/widget-vue

> This library allows to render and interact with the [LiveChat Chat Widget](https://developers.livechat.com/open-chat-widget/) inside a [Vue](https://vuejs.org/) application.

[![mit](https://img.shields.io/badge/license-MIT-blue.svg)](https://choosealicense.com/licenses/mit/)
![Github lerna version](https://img.shields.io/github/lerna-json/v/livechat/chat-widget-adapters?label=version)
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

#### Vue 3

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

#### Vue 2

```html
<template>
  <LiveChatWidget
    license="12345678"
    visibility="maximized"
    v-on:new-event="handleNewEvent"
  />
</template>

<script>
  import { LiveChatWidget } from '@livechat/widget-vue/v2'

  export default {
    name: 'App',
    components: {
      LiveChatWidget,
    },
    methods: {
      handleNewEvent(event) {
        console.log('LiveChatWidget.onNewEvent', event)
      },
    },
  }
</script>
```

### Props

#### Config data

All properties described below are used for initialization on the first render and later updates of the chat widget with new values on change.

| Prop                   | Type                                   |
| ---------------------- | -------------------------------------- |
| license                | string (required)                      |
| customerName           | string                                 |
| group                  | string                                 |
| customerEmail          | string                                 |
| chatBetweenGroups      | boolean                                |
| sessionVariables       | Record<string, string>                 |
| visibility             | 'maximized' \| 'minimized' \| 'hidden' |
| customIdentityProvider | () => CustomerAuth                     |

CustomerAuth:

| parameters    | type                   | description                                                                            |
| ------------- | ---------------------- | -------------------------------------------------------------------------------------- |
| getFreshToken | () => Promise<Token>   | Should resolve with freshly requested customer access token.                           |
| getToken      | () => Promise<Token>   | Should resolve with currently stored customer access token.                            |
| hasToken      | () => Promise<boolean> | Should resolve with a boolean value representing if a token has been already acquired. |
| invalidate    | () => Promise<void>    | Should handle token invalidation and/or clearing the locally cached value.             |

#### Event handlers

All event handlers listed below are registered if provided for the first time. They unregister on the component cleanup or the property value change. Descriptions of all events are available after clicking on the associated links.

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

This package exports a set of [Vue Composition API](https://v3.vuejs.org/api/composition-api.html#composition-api) utilities that allow consuming reactive data from the chat widget in any place of the application as long as the `LiveChatWidget` component is rendered in the tree.

**The composition API is only availble for Vue 3 apps.**

#### useWidgetState

Access the current chat widget `availability` or `visibility` state if the chat widget is loaded.

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

Check if the chat widget is ready using the boolean flag `isWidgetReady`.

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

Access the `chatId` and `threadId` of the chat if there's one currently available.

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

Access the current greeting `id` and `uniqueId` if one is currently displayed (received and not hidden).

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

Access the `id`, `isReturning`, `status`, and `sessionVariables` of the current customer if the chat widget is loaded.

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

#### Custom Identity Provider

In order to make Custom Identity Provider work, you'll have to properly implement and provide a set of following methods:

- `getToken` - resolving [Chat Widget token]('https://developers.livechat.com/docs/extending-chat-widget/custom-identity-provider#chat-widget-token'). If you want to cache the token, this should return the cached token instead of a fresh request to https://accounts.livechat.com/customer/token endpoint.
- `getFreshToken` - resolving [Chat Widget token]('https://developers.livechat.com/docs/extending-chat-widget/custom-identity-provider#chat-widget-token'). This should always make a call for a fresh token from https://accounts.livechat.com/customer/token endpoint.
- `hasToken` - resolving boolean. It determines whether a token has been acquired.
- `invalidate` - resolving nothing. When called, it should remove the current token. There is no need to do anything else as a new token will be requested by getFreshToken afterwards.

##### Example usage

#### Vue 3

```html
<script lang="ts" setup>
  import { LiveChatWidget } from '@livechat/widget-vue'

  const customIdentityProvider = () => {
    const baseAPI = 'YOUR_API_URL'
    const userId = '30317220-c72d-11ed-2137-0242ac120002'

    const getToken = async () => {
      const response = await fetch(`${baseAPI}/getToken/${userId}`)

      const token = await response.json()
      console.log('getToken', token)
      return token
    }

    const getFreshToken = async () => {
      const response = await fetch(`${baseAPI}/getFreshToken/${userId}`)

      const token = await response.json()
      console.log('getFreshToken, token')
      return token
    }

    const hasToken = async () => {
      const response = await fetch(`${baseAPI}/hasToken/${userId}`)
      const data = await response.json()
      return data
    }

    const invalidateToken = async () => {
      const response = await fetch(`${baseAPI}/invalidate/${userId}`)
      const data = await response.json()
      console.log(data)
    }

    return {
      getToken,
      getFreshToken,
      hasToken,
      invalidate: invalidateToken,
    }
  }
</script>

<template>
  <LiveChatWidget
    license="12345678"
    visibility="maximized"
    :customIdentityProvider="customIdentityProvider"
  />
</template>
```

#### Vue 2

```html
<template>
  <LiveChatWidget
    license="12345678"
    visibility="maximized"
    :customIdentityProvider="customIdentityProvider"
  />
</template>

<script>
  import { LiveChatWidget } from '@livechat/widget-vue/v2'

  export default {
    name: 'App',
    components: {
      LiveChatWidget,
    },
    methods: {
      customIdentityProvider() {
        const baseAPI = 'YOUR_API_URL'
        const userId = '30317220-c72d-11ed-2137-0242ac120002'

        const getToken = async () => {
          const response = await fetch(`${baseAPI}/getToken/${userId}`)

          const token = await response.json()
          console.log('getToken', token)
          return token
        }

        const getFreshToken = async () => {
          const response = await fetch(`${baseAPI}/getFreshToken/${userId}`)

          const token = await response.json()
          console.log('getFreshToken, token')
          return token
        }

        const hasToken = async () => {
          const response = await fetch(`${baseAPI}/hasToken/${userId}`)
          const data = await response.json()
          return data
        }

        const invalidateToken = async () => {
          const response = await fetch(`${baseAPI}/invalidate/${userId}`)
          const data = await response.json()
          console.log(data)
        }

        return {
          getToken,
          getFreshToken,
          hasToken,
          invalidate: invalidateToken,
        }
      },
    },
  }
</script>
```

For more information about Custom Identity Provider, check out https://developers.livechat.com/docs/extending-chat-widget/custom-identity-provider

## Contributing

Pull requests are welcome. For major changes, please open an issue first, so we can discuss what you would like to change. Follow a [Contributing guide](https://github.com/livechat/chat-widget-adapters/blob/master/CONTRIBUTING.md) for more details.

## License

This project is [MIT licensed](https://choosealicense.com/licenses/mit/)
