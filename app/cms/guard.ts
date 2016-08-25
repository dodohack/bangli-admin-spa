/**
 * CanDeactivate guards
 */
import { CanDeactivate }          from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot }    from '@angular/router';

import { PostsPage }    from './posts.page';
import { PostPage }     from './post.page';

export class PostsEditGuard implements CanDeactivate<PostsPage> {
    canDeactivate (component: PostsPage,
                   route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot) {
        return component.canDeactivate();
    }
}

export class PostEditGuard implements CanDeactivate<PostPage> {
    canDeactivate (component: PostPage,
                   route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot) {
        return component.canDeactivate();
    }
}
