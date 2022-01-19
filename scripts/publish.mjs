import isCI from 'is-ci'

if (isCI) {
	await Promise.all([$`yarn lint`, $`yarn test`, $`yarn build`])
	await $`lerna publish from-git --yes`
} else {
	console.error('Publish script should be run only on CI')
	process.exit(1)
}
