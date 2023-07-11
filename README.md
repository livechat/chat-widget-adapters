# <img src="https://livechat.design/images/livechat/DIGITAL%20%28RGB%29/SVG/Mark_RGB_Orange.svg" widht="24px" height="24px" /> LiveChat Chat Widget Adapters

> This project contains a set of libraries for adapting the [LiveChat Chat Widget](https://platform.text.com/open-chat-widget) with certain frontend frameworks, utilizing the [Chat Widget JS API](https://platform.text.com/docs/extending-chat-widget/javascript-api).

[![mit](https://img.shields.io/badge/license-MIT-blue.svg)](https://choosealicense.com/licenses/mit/)
![Github lerna version](https://img.shields.io/github/lerna-json/v/livechat/chat-widget-adapters?label=version)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![Check](https://github.com/livechat/chat-widget-adapters/actions/workflows/check.yml/badge.svg?branch=master)](https://github.com/livechat/chat-widget-adapters/actions/workflows/check.yml)

| 🛠 Framework                                                                                                          | 📦 Library                                                                         | ⚖️ Size                                                                                                 |
| -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| <img widht="12px" height="12px" src ="https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png" /> **React**   | [@livechat/widget-react](https://www.npmjs.com/package/@livechat/widget-react)     | ![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@livechat/widget-react?label=%20)   |
| <img widht="12px" height="12px" src ="https://cdn.iconscout.com/icon/free/png-256/vue-282497.png" /> **Vue**         | [@livechat/widget-vue](https://www.npmjs.com/package/@livechat/widget-vue)         | ![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@livechat/widget-vue?label=%20)     |
| <img widht="12px" height="12px" src ="https://cdn.iconscout.com/icon/free/png-256/angular-226066.png" /> **Angular** | [@livechat/widget-angular](https://www.npmjs.com/package/@livechat/widget-angular) | ![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@livechat/widget-angular?label=%20) |

## 🗒️ Documentation

For more details and docs about this project, visit the [Chat Widget Adapters documentation page](https://platform.text.com/docs/extending-chat-widget/chat-widget-adapters).

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

Read our [Contributing Guide](CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes.

This project has adopted a [Code of Conduct](CODE_OF_CONDUCT.md) that we expect project participants to adhere to. Please read the full text so that you can understand what actions will and will not be tolerated.

## 📃 License

The code and documentation in this project are released under the [MIT License](https://choosealicense.com/licenses/mit/).

## 🧑‍💻 [Text Platform](https://platform.text.com/): who are we?

Behind [Text](https://www.text.com/), there’s a [team of passionate people](https://www.text.com/team/) building online customer service software with online chat, help desk software, chatbot, and web analytics capabilities.

With a suite of five products ([LiveChat](https://www.livechat.com), [ChatBot](https://chatbot.com/), [HelpDesk](https://helpdesk.com/), [KnowledgeBase](https://www.knowledgebase.com/), and [OpenWidget](https://openwidget.com/)) and their powerful APIs, we power customer communication for 36,000 companies in 150 countries.

[The Platform](https://platform.text.com/) is a range of products and services that can be used to build a variety of communication tools for businesses. Our [Developer Program](https://platform.text.com/developer-program) and [Marketplace](https://www.livechat.com/marketplace/) create an open ecosystem for developers, partners, and customers. With our [advanced APIs](https://platform.text.com/) and comprehensive [documentation](https://platform.text.com/docs), you can shape the future of communication with us — starting today.

[Join our Discord](https://discord.com/invite/NcfJu3a9kM) to learn, get inspired, and meet other developers!
