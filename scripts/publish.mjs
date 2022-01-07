import isCI from 'is-ci'

if (isCI) {
	await Promise.all([$`npm run lint`, $`npm run test`, $`npm run build`])
	await $`lerna publish from-git --yes`
} else {
	console.error('Publish script should be run only on CI')
	process.exit(1)
}
