/* eslint-disable prefer-rest-params, @typescript-eslint/no-explicit-any, @typescript-eslint/ban-ts-comment, @typescript-eslint/unbound-method */
import type { ExtendedWindow } from './types'

declare const window: ExtendedWindow

const scriptRef: { current: HTMLScriptElement | null } = { current: null }

export function createJSApi() {
	const { slice } = Array.prototype

	/* istanbul ignore next */
	function handle(args: any) {
		// @ts-ignore
		return api._h ? api._h.apply(null, args) : api._q.push(args)
	}
	/* istanbul ignore next */
	const api = {
		_q: [],
		_h: null,
		_v: '2.0',
		on: function () {
			handle(['on', slice.call(arguments)])
		},
		once: function () {
			handle(['once', slice.call(arguments)])
		},
		off: function () {
			handle(['off', slice.call(arguments)])
		},
		get: function () {
			if (!api._h) {
				throw new Error("[LiveChatWidget] You can't use getters before load.")
			}
			return handle(['get', slice.call(arguments)])
		},
		call: function () {
			handle(['call', slice.call(arguments)])
		},
		init: function () {
			const script = document.createElement('script')
			script.async = true
			script.type = 'text/javascript'
			script.src = 'https://cdn.livechatinc.com/tracking.js'
			document.head.appendChild(script)
			scriptRef.current = script
		},
	}

	scriptRef.current?.remove()

	window.LiveChatWidget = window.LiveChatWidget || api

	return scriptRef
}
