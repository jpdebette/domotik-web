import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DomotikWebSharedModule } from '../../shared';
import {
    CommandService,
    CommandPopupService,
    CommandComponent,
    CommandDetailComponent,
    CommandDialogComponent,
    CommandPopupComponent,
    CommandDeletePopupComponent,
    CommandDeleteDialogComponent,
    commandRoute,
    commandPopupRoute,
} from './';

const ENTITY_STATES = [
    ...commandRoute,
    ...commandPopupRoute,
];

@NgModule({
    imports: [
        DomotikWebSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CommandComponent,
        CommandDetailComponent,
        CommandDialogComponent,
        CommandDeleteDialogComponent,
        CommandPopupComponent,
        CommandDeletePopupComponent,
    ],
    entryComponents: [
        CommandComponent,
        CommandDialogComponent,
        CommandPopupComponent,
        CommandDeleteDialogComponent,
        CommandDeletePopupComponent,
    ],
    providers: [
        CommandService,
        CommandPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DomotikWebCommandModule {}
