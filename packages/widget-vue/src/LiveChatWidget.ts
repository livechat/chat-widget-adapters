import { Component } from 'vue'
import { createWidget } from '@livechat/widget-core'
import type { ExtendedWindow, WidgetInstance, WidgetConfig } from '@livechat/widget-core'

declare const window: ExtendedWindow

type Props = Pick<WidgetConfig, 'license' | 'group'>

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
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const that = this
		that.widget = createWidget({ license: that.license, group: that.group })
		window.__lc.integration_name = process.env.PACKAGE_NAME
		that.widget.init()
	},
	beforeUnmount() {
		const that = this as { widget?: WidgetInstance }
		that.widget?.destroy()
	},
} as Component<Props>
