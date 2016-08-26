/**
 * This module contains newsletter, email template etc.
 */
import { NgModule }     from '@angular/core';
import { SharedModule } from '../directives/shared.module';

import { routing }      from './routing';

import { NewslettersEditGuard } from './guard';
import { NewsletterEditGuard }  from './guard';
import { TemplateEditGuard }    from './guard';

import { NewslettersList }  from './components/newsletters.list';
import { TemplatesList }    from './components/templates.list';

import { NewslettersPage }  from './newsletters.page';
import { NewsletterPage }   from './newsletter.page';
import { TemplatesPage }    from './templates.page';
import { TemplatePage }     from './template.page';

@NgModule({
    imports: [ SharedModule, routing ],
    declarations: [
        NewslettersList, TemplatesList,
        NewslettersPage, NewsletterPage,
        TemplatesPage, TemplatePage
    ],
    providers: [
        NewslettersEditGuard,
        NewsletterEditGuard,
        TemplateEditGuard
    ]
})
export class EmailModule {}
