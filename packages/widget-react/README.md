# @livechat/widget-react

> This library allows to render and interact with [LiveChat Chat Widget](https://developers.livechat.com/open-chat-widget/) inside [React](https://reactjs.org/) application.

![](https://img.shields.io/badge/license-MIT-blue.svg)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![Check](https://github.com/livechat/chat-widget-adapters/actions/workflows/check.yml/badge.svg?branch=master)](https://github.com/livechat/chat-widget-adapters/actions/workflows/check.yml)

## Installation

Using npm:

```bash
npm install @livechat/widget-react
```

or using yarn:

```bash
yarn add @livechat/widget-react
```

## Usage

### Render

```js
import { LiveChatWidget } from '@livechat/widget-react'

function App() {
  return (
    <LiveChatWidget
      license="12345678"
      visibility="maximized"
      onNewEvent={(event) => console.log('LiveChatWidget.onNewEvent', event)}
    />
  )
}
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

All event handlers listed below are registered when provided first time and later unregistered on componenet cleanup or property value change. Each event description is available after clicking an asociated link.

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

### Hooks

This package exports set of React Hooks that allows to consume reactive data from chat widget in any place of the application as long as the `LiveChatWidget` component is rendered in the tree.

#### useWidgetState

Access current chat widget `availability` or `visibility` state if the chat widget is loaded.

```js
import { useWidgetState } from '@livechat/widget-react'

function App() {
  const widgetState = useWidgetState()

  if (!widgetState) {
    // widget is not loaded yet
    return null
  }

  return (
    <div>
      <span>{widgetState.availability}</span>
      <span>{widgetState.visibility}</span>
    </div>
  )
}
```

#### useWidgetIsReady

Check if chat widget is ready using simple boolean flag `isWidgetReady`.

```js
import { useWidgetIsReady } from '@livechat/widget-react'

function App() {
  const isWidgetReady = useWidgetIsReady()

  return <div>Chat Widget is {isWidgetReady ? 'loaded' : 'loading...'}</div>
}
```

#### useWidgetChatData

Access ongoing chat `chatId` and `threadId` if there is currently one available.

```js
import { useWidgetChatData } from '@livechat/widget-react'

function App() {
  const chatData = useWidgetChatData()

  if (!chatData) {
    // there is no ongoing chat
    return null
  }

  return (
    <div>
      <span>{chatData.chatId}</span>
      <span>{chatData.threadId}</span>
    </div>
  )
}
```

#### useWidgetGreeting

Access current greeting `id` and `uniqueId` if there is currently one disaplyed (received and not hidden).

```js
import { useWidgetGreeting } from '@livechat/widget-react'

function App() {
  const greeting = useWidgetGreeting()
  return null
}

function App() {
  const greeting = useWidgetGreeting()

  if (!greeting) {
    // there is no greeting in the chat or it was hidden
    return null
  }

  return (
    <div>
      <span>{greeting.id}</span>
      <span>{greeting.uniqueId}</span>
    </div>
  )
}
```

#### useWidgetCustomerData

Access current customer `id`, `isReturning`, `status` and `sessionVariables` data if the chat widget is loaded.

```js
import { useWidgetCustomerData } from '@livechat/widget-react'

function App() {
  const customerData = useWidgetCustomerData()

  if (!customerData) {
    // widget is not loaded yet
    return null
  }

  return (
    <div>
      <span>{customerData.id}</span>
      <span>{customerData.isReturning}</span>
      <span>{customerData.status}</span>
      {Object.keys(customerData.sessionVariables).map((key) => {
        return <span key={key}>{customerData.sessionVariables[key]}</span>
      })}
    </div>
  )
}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Follow a [Contributing guide](https://github.com/livechat/chat-widget-adapters#-contributing) for more detials.

## License

[MIT](https://choosealicense.com/licenses/mit/)
