import isCI from 'is-ci'

if (isCI) {
	await $`lerna bootstrap --no-private`
} else {
	await $`lerna bootstrap`
	await $`prettier **/package*.json --write --loglevel silent`
	await $`husky install`
}
