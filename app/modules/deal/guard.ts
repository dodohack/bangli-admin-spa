/**
 * CanDeactivate guards
 */
import { Injectable }             from '@angular/core';
import { CanDeactivate }          from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot }    from '@angular/router';

import { DealPostPage }    from './post.page';
import { DealTopicPage }   from './topic.page';

@Injectable()
export class DealPostEditGuard implements CanDeactivate<DealPostPage> {
    canDeactivate (component: DealPostPage,
                   route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot) {
        return component.canDeactivate();
    }
}

@Injectable()
export class DealTopicEditGuard implements CanDeactivate<DealTopicPage> {
    canDeactivate (component: DealTopicPage,
                   route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot) {
        return component.canDeactivate();
    }
}
