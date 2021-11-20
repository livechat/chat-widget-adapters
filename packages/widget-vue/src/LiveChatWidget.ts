import { Component } from 'vue'
import { createWidget } from '@livechat/widget-core'

type Props = {
	license: string
	group: string
	env: string
}

export default {
	template: '',
	props: {
		license: String,
		env: String,
	},
	render() {
		return null
	},
	data() {
		return {}
	},
	beforeMount() {
		const that = this as Props & { destroy: VoidFunction }
		that.destroy = createWidget({
			license: that.license,
			group: that.group,
			env: that.env,
		})
	},
	beforeUnmount() {
		const that = this as { destroy?: VoidFunction }
		if (that.destroy) {
			that.destroy()
		}
	},
} as Component
