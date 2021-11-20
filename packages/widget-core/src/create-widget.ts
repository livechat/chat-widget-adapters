/* eslint-disable */
type Options = {
	license: string
	group?: string
	env?: string
}

export function createWidget({ license, group, env }: Options): VoidFunction {
	const envUrlPart = env ? env + '/' : ''

	// @ts-ignore
	window.__lc = window.__lc || {}
	// @ts-ignore
	window.__lc.license = Number(license)
	if (typeof group !== 'undefined') {
		// @ts-ignore
		window.__lc.group = Number(group)
	}
	// @ts-ignore
	;(function (n, t, c) {
		// @ts-ignore
		function i(n) {
			// @ts-ignore
			return e._h ? e._h.apply(null, n) : e._q.push(n)
		}
		var e = {
			_q: [],
			_h: null,
			_v: '2.0',
			on: function () {
				i(['on', c.call(arguments)])
			},
			once: function () {
				i(['once', c.call(arguments)])
			},
			off: function () {
				i(['off', c.call(arguments)])
			},
			get: function () {
				if (!e._h) throw new Error("[LiveChatWidget] You can't use getters before load.")
				return i(['get', c.call(arguments)])
			},
			call: function () {
				i(['call', c.call(arguments)])
			},
			init: function () {
				const n = t.createElement('script')
				;(n.async = !0),
					(n.type = 'text/javascript'),
					(n.src = `https://cdn.livechatinc.com/${envUrlPart}tracking.js`),
					t.head.appendChild(n)
			},
		}
		// @ts-ignore
		!n.__lc.asyncInit && e.init(), (n.LiveChatWidget = n.LiveChatWidget || e)
	})(window, document, [].slice)

	return () => {
		// @ts-ignore
		window.LiveChatWidget.call('destroy')
	}
}
