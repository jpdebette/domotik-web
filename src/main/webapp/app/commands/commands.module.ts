import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DomotikWebSharedModule } from '../shared';
import {
    CommandsPopupComponent,
    CommandsComponent,
    CommandsPopupService,
    CommandsPopupRoute
} from './';

@NgModule({
    imports: [
        DomotikWebSharedModule,
        RouterModule.forRoot([ CommandsPopupRoute ], { useHash: true })
    ],
    declarations: [
        CommandsComponent,
        CommandsPopupComponent
    ],
    entryComponents: [
        CommandsComponent,
        CommandsPopupComponent
    ],
    providers: [
        CommandsPopupService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DomotikWebCommandsModule {}
