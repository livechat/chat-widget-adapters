import * as React from 'react'
import { createRoot } from 'react-dom/client'

Object.defineProperty(global, 'IS_REACT_ACT_ENVIRONMENT', { value: true })

export function createHookValueContainer(hook: () => any, rootElement: HTMLElement | null) {
	const resultId = 'result'
	const root = createRoot(rootElement as HTMLElement)

	function RenderHookValue() {
		const value = hook()
		return <div id={resultId}>{JSON.stringify(value, null, 2)}</div>
	}

	function RenderNothing() {
		return null
	}

	function mount() {
		root.render(<RenderHookValue />)
	}

	function unmount() {
		root.render(<RenderNothing />)
	}

	function getResultContent() {
		return document.getElementById(resultId)?.textContent
	}

	return { mount, unmount, getResultContent }
}
