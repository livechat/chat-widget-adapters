import { createApp } from 'vue'

export function createHookValueContainer(hook: () => any, root: HTMLElement) {
	const resultId = 'result'

	const App = createApp({
		setup() {
			const value = hook()
			return {
				value,
				id: resultId,
			}
		},
		template: '<div :id="id">{{ JSON.stringify(value, null, 2) }}</div>',
	})

	function mount() {
		App.mount(root)
	}

	function unmount() {
		App.unmount()
	}

	function getResultContent() {
		return document.getElementById(resultId)?.textContent
	}

	return { mount, unmount, getResultContent }
}
