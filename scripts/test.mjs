import isCI from 'is-ci'

if (!fs.existsSync('packages/widget-core/dist')) {
	await $`lerna run build --scope @livechat/widget-core`
}

if (isCI) {
	await $`lerna run coverage`
} else {
	await $`lerna run test`
}
