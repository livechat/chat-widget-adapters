import * as React from 'react'
import { render } from 'react-dom'

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
