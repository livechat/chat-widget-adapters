import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { createWidget } from '@livechat/widget-core'

@Component({
	selector: 'livechat-widget',
	template: '',
	styles: [],
})
export class LiveChatWidgetComponent implements OnInit, OnDestroy {
	@Input() license = ''
	@Input() group?: string
	@Input() env?: string
	destroy?: VoidFunction

	ngOnInit() {
		this.destroy = createWidget({
			license: this.license,
			group: this.group,
			env: this.env,
		})
	}

	ngOnDestroy() {
		if (this.destroy) {
			this.destroy()
		}
	}
}
