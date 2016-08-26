/**
 * CanDeactivate guards
 */
import { Injectable }             from '@angular/core';
import { CanDeactivate }          from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot }    from '@angular/router';

import { DealsPage }    from './deals.page';

@Injectable()
export class DealsEditGuard implements CanDeactivate<DealsPage> {
    canDeactivate (component: DealsPage,
                   route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot) {
        return component.canDeactivate();
    }
}
