import { NgModule } from '@angular/core'

import { LiveChatWidgetComponent } from './LiveChatWidget.component'
import { WidgetIsReadyService } from './services/WidgetIsReady.service'
import { WidgetStateService } from './services/WidgetState.service'
import { WidgetCustomerDataService } from './services/WidgetCustomerData.service'
import { WidgetChatDataService } from './services/WidgetChatData.service'
import { WidgetGreetingService } from './services/WidgetGreeting.service'

@NgModule({
	imports: [],
	declarations: [LiveChatWidgetComponent],
	exports: [LiveChatWidgetComponent],
	providers: [
		WidgetIsReadyService,
		WidgetStateService,
		WidgetCustomerDataService,
		WidgetChatDataService,
		WidgetGreetingService,
	],
})
export class LiveChatWidgetModule {}
