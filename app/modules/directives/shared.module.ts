/**
 * This NgModule exports shared directives used globally
 */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule }                  from '@angular/common';
import { FormsModule }                   from '@angular/forms';
import { ReactiveFormsModule }           from '@angular/forms';
import { RouterModule }                  from '@angular/router';

import { UPLOAD_DIRECTIVES }             from 'ng2-uploader';
import { Ng2BootstrapModule }            from 'ng2-bootstrap/ng2-bootstrap';
//import { AccordionModule }             from 'ng2-bootstrap/ng2-bootstrap';
//import { TabsModule }                  from 'ng2-bootstrap/ng2-bootstrap';

//import { FroalaEditorDirective } from 'angular2-froala-wysiwyg/lib/froala.directives';
import { FroalaEditorCompnoent } from "ng2-froala-editor/ng2-froala-editor";

import { RevisionHistory }           from './revision-history';
import { RightPanel }                from './right-panel';
import { CategoryTree }              from './category-tree';
import { TopicCloud }                from './topic-cloud';
import { TagCloud }                  from './tag-cloud';
import { CmsTagCloud }               from './cms-tag-cloud';
import { EditorPageHeader }          from './editor-page-header';
import { ListPageHeader }            from './list-page-header';
import { ListFilterBar }             from './list-filter-bar';
import { FastEditPostFormComponent } from './fast-edit-post-form.component';
import { SearchBox }                 from './search-box';
import { DateFilterComponent }       from './date-filter.component';

@NgModule({
    imports: [
        Ng2BootstrapModule,
        //AccordionModule,
        //TabsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule ,
    ],
    declarations: [
        UPLOAD_DIRECTIVES,

        FroalaEditorCompnoent,
        //FroalaEditorDirective,

        RightPanel,
        ListPageHeader,
        ListFilterBar,
        CategoryTree,
        TopicCloud,
        TagCloud,
        EditorPageHeader,
        CmsTagCloud,
        FastEditPostFormComponent,
        SearchBox,
        RevisionHistory,
        DateFilterComponent,
    ],
    exports: [
        Ng2BootstrapModule,
        //AccordionModule,
        //TabsModule,

        UPLOAD_DIRECTIVES,

        FroalaEditorCompnoent,
        //FroalaEditorDirective,

        RightPanel,
        ListPageHeader,
        ListFilterBar,
        CategoryTree,
        TopicCloud,
        TagCloud,
        EditorPageHeader,
        CmsTagCloud,
        FastEditPostFormComponent,
        SearchBox,
        RevisionHistory,
        DateFilterComponent,

        CommonModule,
        FormsModule
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}
