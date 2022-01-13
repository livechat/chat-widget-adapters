# <img src="https://livechat.design/images/livechat/DIGITAL%20%28RGB%29/SVG/Mark_RGB_Orange.svg" widht="24px" height="24px" /> LiveChat Chat Widget Adapters

> This project contains a set of libraries for adapting the [LiveChat Chat Widget](https://developers.livechat.com/open-chat-widget/) with certain frontend frameworks.

[![mit](https://img.shields.io/badge/license-MIT-blue.svg)](https://choosealicense.com/licenses/mit/)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![Check](https://github.com/livechat/chat-widget-adapters/actions/workflows/check.yml/badge.svg?branch=master)](https://github.com/livechat/chat-widget-adapters/actions/workflows/check.yml)

| 🛠 Framework                                                                                                          | 📦 Library                                                                         |
| -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| <img widht="12px" height="12px" src ="https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png" /> **React**   | [@livechat/widget-react](https://www.npmjs.com/package/@livechat/widget-react)     |
| <img widht="12px" height="12px" src ="https://cdn.iconscout.com/icon/free/png-256/vue-282497.png" /> **Vue**         | [@livechat/widget-vue](https://www.npmjs.com/package/@livechat/widget-vue)         |
| <img widht="12px" height="12px" src ="https://cdn.iconscout.com/icon/free/png-256/angular-226066.png" /> **Angular** | [@livechat/widget-angular](https://www.npmjs.com/package/@livechat/widget-angular) |

## 📦 Installation

Use the package manager [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) to install choosen package in your project.

```bash
npm install @livechat/widget-*
# or
yarn add @livechat/widget-*
```

## 🚀 Usage

### <img widht="16px" height="16px" src ="https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png" /> **[React](/packages/widget-react)**

```ts
// App.tsx

import { LiveChatWidget } from '@livechat/widget-react'

export function App() {
  return <LiveChatWidget license="12332502" group="0" />
}
```

### <img widht="16px" height="16px" src ="https://cdn.iconscout.com/icon/free/png-256/vue-282497.png" /> **[Vue](/packages/widget-vue)**

```html
<!-- App.vue -->

<script setup>
  import { LiveChatWidget } from '@livechat/widget-vue'
</script>

<template>
  <LiveChatWidget license="12332502" group="0" />
</template>
```

### <img widht="16px" height="16px" src ="https://cdn.iconscout.com/icon/free/png-256/angular-226066.png" /> **[Angular](/packages/widget-angular)**

```ts
// app.module.ts

import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { LiveChatWidgetModule } from '@livechat/widget-angular'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, LiveChatWidgetModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

```html
<!-- app.component.html -->

<livechat-widget license="12332502" group="0"></livechat-widget>
```

## 🏗 Contributing

Read our [contributing guide](CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes.

## 📃 License

The code and documentation in this project are released under the [MIT License](https://choosealicense.com/licenses/mit/).
