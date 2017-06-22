import { Route } from '@angular/router';
import { CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../shared';
import { CommandsComponent } from './commands.component';
import { CommandsPopupComponent } from './commands.component';

export const CommandsPopupRoute: Route = {
    path: 'commands',
    component: CommandsPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'commands.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
};
