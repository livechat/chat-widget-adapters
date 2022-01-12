if (!fs.existsSync('packages/widget-core/dist')) {
	await $`lerna run build --scope @livechat/widget-core`
}
await $`lerna run test`
