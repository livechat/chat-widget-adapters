import * as React from 'react'
import { render } from 'react-dom'

export function createDispatcher() {
	const events = new Map<string, VoidFunction | ((...args: any) => void)>()

	function setListener(name: Parameters<typeof events.set>['0'], callback: Parameters<typeof events.set>['1']) {
		events.set(name, callback)
	}

	function dispatch(name: Parameters<typeof events.set>['0'], payload?: any) {
		const callback = events.get(name)
		if (callback) {
			callback(payload)
		}
	}

	return { setListener, dispatch }
}

export function createHookValueContainer(hook: () => any, root: HTMLElement | null) {
	const resultId = 'result'

	function RenderHookValue() {
		const value = hook()
		return <div id={resultId}>{JSON.stringify(value, null, 2)}</div>
	}

	function RenderNothing() {
		return null
	}

	function mount() {
		render(<RenderHookValue />, root)
	}

	function unmount() {
		render(<RenderNothing />, root)
	}

	function getResultContent() {
		return document.getElementById(resultId)?.textContent
	}

	return { mount, unmount, getResultContent }
}
