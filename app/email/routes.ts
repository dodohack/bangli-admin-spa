import { Routes } from '@angular/router';

import { AuthGuard }          from '../auth';
import { EmailHomePage }      from '.';
import { EmailTemplatesPage } from '.';
import { EmailTemplatePage }  from '.';
import { NewslettersPage }    from '.';
import { NewsletterPage }     from '.';


export const emailRoutes: Routes = [
    /* Email management, FIXME: root path can't have a component! */
    {
        path: 'email',
            canActivate: [AuthGuard],
        children: [
            { path: '', component: EmailHomePage },
            {
                path: 'templates',
                children: [
                    { path: '', pathMatch: 'full', redirectTo: '1' },
                    { path: ':page', component: EmailTemplatesPage }
                ]
            },
    
            {
                // New/Edit single email template
                path: 'template',
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'new' },
                    { path: ':id', component: EmailTemplatePage }
                ]
            },

            {
                path: 'newsletters',
                children: [
                    { path: '', pathMatch: 'full', redirectTo: '1' },
                    { path: ':page', component: NewslettersPage }
                ]
            },
            {
                // New/Edit newsletter
                path: 'newsletter',
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'new' },
                    { path: ':id', component: NewsletterPage }
                ]
            },
    },
];