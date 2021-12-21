# @livechat/widget-angular

> This library allows to render and interact with [LiveChat Chat Widget](https://developers.livechat.com/open-chat-widget/) inside [Angular](http://angular.io/) application.

![](https://img.shields.io/badge/license-MIT-blue.svg)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![Check](https://github.com/livechat/chat-widget-adapters/actions/workflows/check.yml/badge.svg?branch=master)](https://github.com/livechat/chat-widget-adapters/actions/workflows/check.yml)

## Installation

Using npm:

```bash
npm install @livechat/widget-angular
```

or using yarn:

```bash
yarn add @livechat/widget-angular
```

## Usage

### Render

```ts
// app.component.ts

import { Component } from '@angular/core'
import { EventHandlerPayload } from '@livechat/widget-angular'

@Component({
  /* ... */
  templateUrl: './app.component.html',
})
export class AppComponent {
  handleNewEvent(event: EventHandlerPayload<'onNewEvent'>) {
    console.log('LiveChatWidget.onNewEvent', event)
  }
}
```

```html
<!-- app.component.html -->
<livechat-widget
  license="12345678"
  visibility="maximized"
  (onNewEvent)="handleNewEvent($event)"
></livechat-widget>
```

### Assignable properties

#### Config data

All properties described below are used for initialization on the first render and later update chat widget with new values on change.

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

### Services

The `LiveChatWidgetModule`, exported from this package, registers a set of injectable services. All of them expose a subscribable [BehaviorSubject](https://rxjs.dev/api/index/class/BehaviorSubject) instance. It allows consuming reactive data from chat widget in any place of the application, as long as the `LiveChatWidget` component is rendered in the tree.

#### WidgetStateService

Access current chat widget `availability` or `visibility` state if the chat widget is loaded.

```ts
// app.component.ts

import { Component, OnInit } from '@angular/core'
import {
  WidgetStateService,
  WidgetStateSubject,
} from '@livechat/widget-angular'

@Component({
  /* ... */
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  widgetState$: WidgetStateSubject

  constructor(widgetStateService: WidgetStateService) {
    this.widgetState$ = widgetStateService.subject
  }

  ngOnInit() {
    this.widgetState$.subscribe((widgetState) => {
      console.log('AppComponent.ngOnInit.widgetState', widgetState)
    })
  }
}
```

```html
<!-- app.component.html -->

<div *ngIf="widgetState$ | async as widgetState">
  <div>{{ widgetState.availability }}</div>
  <div>{{ widgetState.visibility }}</div>
</div>
```

#### WidgetIsReadyService

Check if chat widget is ready using the boolean flag `isWidgetReady`.

```ts
// app.component.ts

import { Component, OnInit } from '@angular/core'
import {
  WidgetIsReadyService,
  WidgetIsReadySubject,
} from '@livechat/widget-angular'

@Component({
  /* ... */
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  widgetIsReady$: WidgetIsReadySubject

  constructor(widgetIsReadyService: WidgetIsReadyService) {
    this.widgetIsReady$ = widgetIsReadyService.subject
  }

  ngOnInit() {
    this.widgetIsReady$.subscribe((widgetIsReady) => {
      console.log('AppComponent.ngOnInit.widgetIsReady', widgetIsReady)
    })
  }
}
```

```html
<!-- app.component.html -->

<div>{{ widgetIsReady$ | async }}</div>
```

#### WidgetChatDataService

Access the `chatId` and `threadId` of the chat, if there is currently one available.

```ts
// app.component.ts

import { Component, OnInit } from '@angular/core'
import {
  WidgetChatDataService,
  WidgetChatDataSubject,
} from '@livechat/widget-angular'

@Component({
  /* ... */
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  chatData$: WidgetChatDataSubject

  constructor(chatDataService: WidgetChatDataService) {
    this.chatData$ = chatDataService.subject
  }

  ngOnInit() {
    this.chatData$.subscribe((chatData) => {
      console.log('AppComponent.ngOnInit.chatData', chatData)
    })
  }
}
```

```html
<!-- app.component.html -->

<div *ngIf="chatData$ | async as chatData">
  <div>{{ chatData.availability }}</div>
  <div>{{ chatData.visibility }}</div>
</div>
```

#### WidgetGreetingService

Access current greeting `id` and `uniqueId` if one is currently displayed (received and not hidden).

```ts
// app.component.ts

import { Component, OnInit } from '@angular/core'
import {
  WidgetGreetingService,
  WidgetGreetingSubject,
} from '@livechat/widget-angular'

@Component({
  /* ... */
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  greeting$: WidgetGreetingSubject

  constructor(greetingService: WidgetGreetingService) {
    this.greeting$ = greetingService.subject
  }

  ngOnInit() {
    this.greeting$.subscribe((greeting) => {
      console.log('AppComponent.ngOnInit.greeting', greeting)
    })
  }
}
```

```html
<!-- app.component.html -->

<div *ngIf="greeting$ | async as greeting">
  <div>{{ greeting.availability }}</div>
  <div>{{ greeting.visibility }}</div>
</div>
```

#### WidgetCustomerDataService

Access the `id`, `isReturning`, `status`, and `sessionVariables` of the current customer, if the chat widget is loaded.

```ts
// app.component.ts

import { Component, OnInit } from '@angular/core'
import {
  WidgetCustomerDataService,
  WidgetCustomerDataSubject,
} from '@livechat/widget-angular'

@Component({
  /* ... */
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  customerData$: WidgetCustomerDataSubject

  constructor(customerDataService: WidgetCustomerDataService) {
    this.customerData$ = customerDataService.subject
  }

  ngOnInit() {
    this.customerData$.subscribe((customerData) => {
      console.log('AppComponent.ngOnInit.customerData', customerData)
    })
  }
}
```

```html
<!-- app.component.html -->

<div *ngIf="customerData$ | async as customerData">
  <div>{{ customerData.id }}</div>
  <div>{{ customerData.isReturning }}</div>
  <div>{{ customerData.status }}</div>
  <ul>
    <li *ngFor="let variable of customerData.sessionVariables | keyvalue">
      {{ variable.value }}
    </li>
  </ul>
</div>
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Follow a [Contributing guide](https://github.com/livechat/chat-widget-adapters#-contributing) for more details.

## License

[MIT](https://choosealicense.com/licenses/mit/)
