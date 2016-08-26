/**
 * CanDeactivate guards
 */
import { Injectable }             from '@angular/core';
import { CanDeactivate }          from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot }    from '@angular/router';

import { NewslettersPage }   from './newsletters.page';
import { NewsletterPage }    from './newsletter.page';
import { TemplatePage }      from './template.page';

@Injectable()
export class NewslettersEditGuard implements CanDeactivate<NewslettersPage> {
    canDeactivate (component: NewslettersPage,
                   route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot) {
        return component.canDeactivate();
    }
}

@Injectable()
export class NewsletterEditGuard implements CanDeactivate<NewsletterPage> {
    canDeactivate (component: NewsletterPage,
                   route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot) {
        return component.canDeactivate();
    }
}

@Injectable()
export class TemplateEditGuard implements CanDeactivate<TemplatePage> {
    canDeactivate (component: TemplatePage,
                   route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot) {
        return component.canDeactivate();
    }
}
