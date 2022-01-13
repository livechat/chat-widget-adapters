# 🏗 Contributing

## Proposing a Change

In order to propose a change or request new feature we recommend filling the [Feature request](https://github.com/livechat/chat-widget-adapters/issues/new/choose).

## Reporting a Bug

We track public bugs in [GitHub Issues](https://github.com/livechat/chat-widget-adapters/issues). If you would like to report one we recommend filling the [Bug report](https://github.com/livechat/chat-widget-adapters/issues/new/choose).

## Development Workflow

- Install dependecies using `npm install`. This will also bootstrap a monorepo installing dependencies inside each package and linking them together.

- Build libraries using `npm run build` at the top level or inside single package.

- Start watch mode for all adapters packages running `npm start packages`.

- Start example apps showcasing usage of componenets for each framework using `npm start examples`.

- Start watch mode for given adapter with its example app running `npm start vue/react/angular`.

## Versioning

This project uses [lerna](https://lerna.js.org/) to manage versions and publishing. It uses locked [semantic versioning](https://semver.org/) so each package has the same version at the time. You don't need and shouldn't manullay update touched packages versions. Changes will be published as soon as the next release will be rolled out. In order to properly update all packages to a new version checkout to `master` branch and run `npx lerna version`. It will ask about update type and if accepted update all packages and push tagged commit with changes in `package*.json` files.

## Comitting

The project is setup with a code quality tools like [`prettier`](https://npm.im/prettier), [`eslint`](https://npm.im/eslint) and [`manypkg`](https://npm.im/@manypkg/cli). They are being automatically run against changed files on `pre-commit` hook.

## Branch Organization

Submit all changes directly to the `master` branch. We don’t use separate branches for development or for upcoming releases.

## Sending a Pull Request

This project uses a GitHub Actions setup to run on each commit `push` which triggers `lint`, `build` and `test` scripts. Checks must pass in order to unlock merging.

## File structure

```
project
|
└─── packages
|    └─── widget-core                      // source of @livechat/widget-core
|    |    └─── src/__tests__
|    └─── widget-vue                       // source of @livechat/widget-vue
|    |    └─── src/composition/__tests__
|    └─── widget-react                     // source of @livechat/widget-react
|    |    └─── src/hooks/__tests__
|    └─── widget-angular                   // source of @livechat/widget-angular
|         └─── src/services/__tests__
|
└─── examples
|    └─── vue              // example Vue app
|    └─── react            // example React app
|    └─── angular          // example Angular app
|
└─── scripts               // CLI commands used in root npm scripts
```

## Testing

### Manual testing

In order to manually test introduced changes, use one of example apps for the framework whcih package you are chaning. It contains ready to use setup for testing basic functionalities. If you have added something new, make sure to extend the example with possiblity to visually test your changes.

### Automated testing

#### Unit tests

Packages contains a suite of unit tests dedicated for their core functionallities. Whenever you make change or introduce some new functionality, make sure that exisitng tests passes and that coverage remains at the same level.

- To run tests use: `npm run test`
- Tests are localted in: `packages/**/src/**/__tests__`
- In order to verify the current coverage use: `npm run test -- --coverage`

#### E2E tests

TODO: Describe E2E tests setup

### Coverage

#### @livechat/widget-core

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

#### @livechat/widget-react

| File                     | % Stmts | % Branch | % Funcs | % Lines |
| ------------------------ | ------- | -------- | ------- | ------- |
| All files                | 100     | 100      | 100     | 100     |
| useWidgetChatData.ts     | 100     | 100      | 100     | 100     |
| useWidgetCustomerData.ts | 100     | 100      | 100     | 100     |
| useWidgetGreeting.ts     | 100     | 100      | 100     | 100     |
| useWidgetIsReady.ts      | 100     | 100      | 100     | 100     |
| useWidgetState.ts        | 100     | 100      | 100     | 100     |

#### @livechat/widget-vue

| File                     | % Stmts | % Branch | % Funcs | % Lines |
| ------------------------ | ------- | -------- | ------- | ------- |
| All files                | 100     | 100      | 100     | 100     |
| useWidgetChatData.ts     | 100     | 100      | 100     | 100     |
| useWidgetCustomerData.ts | 100     | 100      | 100     | 100     |
| useWidgetGreeting.ts     | 100     | 100      | 100     | 100     |
| useWidgetIsReady.ts      | 100     | 100      | 100     | 100     |
| useWidgetState.ts        | 100     | 100      | 100     | 100     |

#### @livechat/widget-angular

| File                          | % Stmts | % Branch | % Funcs | % Lines |
| ----------------------------- | ------- | -------- | ------- | ------- |
| All files                     | 100     | 100      | 100     | 100     |
| WidgetChatData.service.ts     | 100     | 100      | 100     | 100     |
| WidgetCustomerData.service.ts | 100     | 100      | 100     | 100     |
| WidgetGreeting.service.ts     | 100     | 100      | 100     | 100     |
| WidgetIsReady.service.ts      | 100     | 100      | 100     | 100     |
| WidgetState.service.ts        | 100     | 100      | 100     | 100     |
