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

### Running the project locally

- After cloning the repo install dependecies using `npm install`. This will also bootstrap a monorepo installing dependencies inside each package and linking them together.

- Build libraries using `npm run build` at the top level or inside single package

- Start watch mode for all adapters packages running `npm start packages`

- Start example apps showcasing usage of componenets for each framework using `npm start examples`

- Start watch mode for given adapter with its example app running `npm start vue/react/angular`

### Testing

#### @livechat/widget-react, @livechat/widget-vue, @livechat/widget-angular

In order to test manually introduced changes, use one of example apps for the framework whcih package you are chaning. It contains ready to use setup for testing basic functionalities. If you have added something new, make sure to extend the example with possiblity to visually test your changes.

#### @livechat/widget-core

The core package located contains a suite of unit tests with **100% coverage**. Whenever you make change or introduce some new functionality, make sure that exisitng tests passes and that coverage remains ath at the same level.

- Tests are localted in: `packages/widget-core/src/__tests__`
- To run tests use: `npm run test`
- In order to verify the current coverage use: `npm run test -- --coverage`

| File                     | % Stmts | % Branch | % Funcs | % Lines |
| ------------------------ | ------- | -------- | ------- | ------- |
| All files                | 100     | 100      | 100     | 100     |
| assign-configuration.ts  | 100     | 100      | 100     | 100     |
| assign-customere-data.ts | 100     | 100      | 100     | 100     |
| assign-event-handlers.ts | 100     | 100      | 100     | 100     |
| assign-visibility.ts     | 100     | 100      | 100     | 100     |
| create-js-api.ts         | 100     | 100      | 100     | 100     |
| create-widget.ts         | 100     | 100      | 100     | 100     |
| get-data.ts              | 100     | 100      | 100     | 100     |
| lifecycle.ts             | 100     | 100      | 100     | 100     |

### Versioning

This project uses [lerna](https://lerna.js.org/) to manage versions and publishing. It uses locked versioning so each package has the same version at the time. You don't need and shouldn't manullay update touched packages versions. Changes will be published as soon as the next release will be rolled out. In order to properly update all packages to a new version checkout to `master` branch and run `npx lerna version`. It will ask about update type and if accepted update all packages and push tagged commit with changes in `package*.json` files.

### Comitting

The project is setup with a code quality tools like `prettier` and `eslint`. They are being automatically run against changed files on `pre-commit` hook.

### Opening a Pull Request

This project uses a GitHub Actions setup to run on each commit `push` which triggers `lint`, `build` and `test` scripts. Checks must pass in order to unlock merging.

### File structure

```
project
|
└─── packages
|    └─── widget-core      // source of @livechat/widget-core
|    └─── widget-vue       // source of @livechat/widget-vue
|    └─── widget-react     // source of @livechat/widget-react
|    └─── widget-angular   // source of @livechat/widget-angular
|
└─── examples
|    └─── vue              // example Vue app
|    └─── react            // example React app
|    └─── angular          // example Angular app
|
└─── scripts               // CLI commands used in root npm scripts
```

## 📃 License

[MIT](https://choosealicense.com/licenses/mit/)
