import type { ExtendedWindow, ConfigurationOptions } from './types'

declare const window: ExtendedWindow

export function assignConfiguration({
	license,
	organizationId,
	group,
	chatBetweenGroups,
	sessionVariables,
	customIdentityProvider,
}: ConfigurationOptions): void {
	window.__lc = window.__lc || {}

	if (typeof organizationId === 'string' && organizationId.trim() !== '') {
		window.__lc.organizationId = organizationId
	} else if (typeof license === 'string' && license.trim() !== '') {
		window.__lc.license = Number(license)
	} else {
		throw new Error('[LiveChatWidget] The license or organizationId property is required for initialization')
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
	if (typeof customIdentityProvider === 'function') {
		window.__lc.custom_identity_provider = customIdentityProvider
	}
}
