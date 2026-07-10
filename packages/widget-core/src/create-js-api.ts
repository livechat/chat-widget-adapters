/* eslint-disable prefer-rest-params, @typescript-eslint/no-explicit-any, @typescript-eslint/ban-ts-comment, @typescript-eslint/unbound-method */
import type { ExtendedWindow, Env } from './types'

declare const window: ExtendedWindow

const scriptRef: { current: HTMLScriptElement | null } = { current: null }

const trackingScriptUrls: Record<Env, string> = {
	production: 'https://cdn.livechatinc.com/tracking.js',
	labs: 'https://cdn.labs.livechatinc.com/tracking.js',
	staging: 'https://cdn.staging.livechatinc.com/tracking.js',
}

// window.LiveChatWidget is only assigned once (see the `||` guard below), so `init` must read
// the env from this ref rather than close over the `env` argument - otherwise a reinitialize
// with a different env would keep loading the tracking.js of the very first env.
const envRef: { current: Env } = { current: 'production' }

export function createJSApi(env: Env = 'production') {
	envRef.current = env
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
			script.src = trackingScriptUrls[envRef.current] ?? trackingScriptUrls.production
			document.head.appendChild(script)
			scriptRef.current = script
		},
	}

	scriptRef.current?.remove()

	window.LiveChatWidget = window.LiveChatWidget || api

	return scriptRef
}
