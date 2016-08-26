import { Routes, RouterModule } from '@angular/router';

import { EditorGuard }          from '../auth';
import { NewslettersEditGuard } from './guard';
import { NewsletterEditGuard }  from './guard';
import { TemplateEditGuard }    from './guard';

import { EmailHomePage }        from './home.page';
import { TemplatesPage }        from './templates.page';
import { TemplatePage }         from './template.page';
import { NewslettersPage }      from './newsletters.page';
import { NewsletterPage }       from './newsletter.page';


const routes: Routes = [
    /* Email management, FIXME: root path can't have a component! */
    {
        path: 'email',
        canActivate: [EditorGuard],
        children: [
            { path: '', component: EmailHomePage },
            {
                path: 'templates',
                children: [
                    { path: '', pathMatch: 'full', redirectTo: '1' },
                    { path: ':page', component: TemplatesPage }
                ]
            },
    
            {
                // New/Edit single email template
                path: 'template',
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'new' },
                    { path: ':id', component: TemplatePage, canDeactivatee: [TemplateEditGuard] }
                ]
            },

            {
                path: 'newsletters',
                children: [
                    { path: '', pathMatch: 'full', redirectTo: '1' },
                    { path: ':page', component: NewslettersPage, canDeactivate: [NewslettersEditGuard] }
                ]
            },
            {
                // New/Edit newsletter
                path: 'newsletter',
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'new' },
                    { path: ':id', component: NewsletterPage, canDeactivate: [NewsletterEditGuard] }
                ]
            }
        ]
    },
];

export const routing = RouterModule.forChild(routes);
