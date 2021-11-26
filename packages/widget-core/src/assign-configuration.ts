import type { ExtendedWindow, ConfigurationOptions } from './types'

declare const window: ExtendedWindow

export function assignConfiguration({
	license,
	group,
	chatBetweenGroups,
	sessionVariables,
}: ConfigurationOptions): void {
	window.__lc = window.__lc || {}

	if (typeof license === 'string') {
		window.__lc.license = Number(license)
	} else {
		throw new Error('[LiveChatWidget] The license property is required for initialization')
	}
	if (typeof group !== 'undefined') {
		window.__lc.group = Number(group)
	}
	if (typeof chatBetweenGroups !== 'undefined') {
		window.__lc.chat_between_groups = Boolean(chatBetweenGroups)
	}
	if (sessionVariables instanceof Object) {
		window.__lc.params = Object.entries(sessionVariables).map(([name, value]) => ({ name, value }))
	}
}
