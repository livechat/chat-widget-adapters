import isCI from 'is-ci'

if (!isCI) {
	await $`husky install`
	await $`playwright install chromium`
}
