/**
 * CanDeactivate guards
 */
import { Injectable }             from '@angular/core';
import { CanDeactivate }          from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot }    from '@angular/router';

import { DealPostPage }    from './post.page';

@Injectable()
export class DealPostEditGuard implements CanDeactivate<DealPostPage> {
    canDeactivate (component: DealPostPage,
                   route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot) {
        return component.canDeactivate();
    }
}
