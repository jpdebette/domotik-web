import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DomotikWebSharedModule } from '../../shared';
import {
    CommandParameterService,
    CommandParameterPopupService,
    CommandParameterComponent,
    CommandParameterDetailComponent,
    CommandParameterDialogComponent,
    CommandParameterPopupComponent,
    CommandParameterDeletePopupComponent,
    CommandParameterDeleteDialogComponent,
    commandParameterRoute,
    commandParameterPopupRoute,
} from './';

const ENTITY_STATES = [
    ...commandParameterRoute,
    ...commandParameterPopupRoute,
];

@NgModule({
    imports: [
        DomotikWebSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CommandParameterComponent,
        CommandParameterDetailComponent,
        CommandParameterDialogComponent,
        CommandParameterDeleteDialogComponent,
        CommandParameterPopupComponent,
        CommandParameterDeletePopupComponent,
    ],
    entryComponents: [
        CommandParameterComponent,
        CommandParameterDialogComponent,
        CommandParameterPopupComponent,
        CommandParameterDeleteDialogComponent,
        CommandParameterDeletePopupComponent,
    ],
    providers: [
        CommandParameterService,
        CommandParameterPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DomotikWebCommandParameterModule {}
