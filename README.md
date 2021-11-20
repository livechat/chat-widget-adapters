# LiveChat Chat Widget Adapters

This project contains set of libraries for adapting [LiveChat Chat Widget](https://developers.livechat.com/open-chat-widget/) with certain frontend framework.

| 🛠 Framework                                                                                                          | 📦 Library               |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| <img widht="12px" height="12px" src ="https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png" /> **React**   | @livechat/widget-react   |
| <img widht="12px" height="12px" src ="https://cdn.iconscout.com/icon/free/png-256/vue-282497.png" /> **Vue**         | @livechat/widget-vue     |
| <img widht="12px" height="12px" src ="https://cdn.iconscout.com/icon/free/png-256/angular-226066.png" /> **Angular** | @livechat/widget-angular |

## Installation

Use the package manager [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) to install choosen package in your project.

```bash
npm install @livechat/widget-*
# or
yarn add @livechat/widget-*
```

## Usage

### <img widht="16px" height="16px" src ="https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png" /> **React**

```ts
// App.tsx

import { LiveChatWidget } from '@livechat/widget-react'

function App() {
  return <LiveChatWidget license="12332502" group="0" />
}
```

### <img widht="16px" height="16px" src ="https://cdn.iconscout.com/icon/free/png-256/vue-282497.png" /> **Vue**

```html
<!-- App.vue -->

<script lang="ts">
  import { LiveChatWidget } from '@livechat/widget-vue'

  export default {
    components: {
      LiveChatWidget,
    },
  }
</script>

<template>
  <LiveChatWidget license="12332502" group="0" />
</template>

<style></style>
```

### <img widht="16px" height="16px" src ="https://cdn.iconscout.com/icon/free/png-256/angular-226066.png" /> **Angular**

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

```ts
// app.component.ts

import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {}
```

```html
<!-- app.component.html -->

<livechat-widget license="12332502" group="0"></livechat-widget>
```

## Contributing

### Running the project locally

1. After cloning the repo install dependecies using `npm install`. This will also bootstrap a monorepo installing dependencies inside each package and linking them together.

2. Build libraries using `npm run build` at the top level or inside single package

3. Start example applications showcasing usage of componenets for each framework using `npm start`

### Comitting

The project is setup with a code quality tools like `prettier` and `eslint`. They are automatically runned agianst changed files on `pre-commit` hook.

### Opening a Pull Request

This project have a GitHub Action setup to run on each `push` which triggers `lint` and `build` scripts. Checks must pass in order to unlock merging.

### File structure

```
project
└───packages
    └───widget-core
    │   └───src        // source of core library
    └───widget-vue
    │   └───src        // source of @livechat/widget-vue
    │   └───example
    └───widget-react
    │   └───src        // source of @livechat/widget-react
    │   └───example
    └───widget-angular
        └───src        // source of @livechat/widget-angular
        └───example
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
