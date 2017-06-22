import { Routes } from '@angular/router';

import {
    passwordRoute,
    passwordResetFinishRoute,
    passwordResetInitRoute,
    settingsRoute
} from './';

const ACCOUNT_ROUTES = [
    passwordRoute,
    passwordResetFinishRoute,
    passwordResetInitRoute,
    settingsRoute
];

export const accountState: Routes = [{
    path: '',
    children: ACCOUNT_ROUTES
}];
