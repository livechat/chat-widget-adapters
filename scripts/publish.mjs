import isCI from 'is-ci'

if (isCI) {
	await $`yarn lint`
	await $`yarn build`
	await $`yarn test`
	await $`yarn e2e`
	await $`lerna publish from-git --yes`
} else {
	console.error('Publish script should be run only on CI')
	process.exit(1)
}
