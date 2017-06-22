import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DomotikWebSharedModule } from '../shared';

import {
    PasswordService,
    PasswordResetInitService,
    PasswordResetFinishService,
    PasswordStrengthBarComponent,
    PasswordComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent,
    SettingsComponent,
    accountState
} from './';

@NgModule({
    imports: [
        DomotikWebSharedModule,
        RouterModule.forRoot(accountState, { useHash: true })
    ],
    declarations: [
        PasswordComponent,
        PasswordStrengthBarComponent,
        PasswordResetInitComponent,
        PasswordResetFinishComponent,
        SettingsComponent
    ],
    providers: [
        PasswordService,
        PasswordResetInitService,
        PasswordResetFinishService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DomotikWebAccountModule {}
