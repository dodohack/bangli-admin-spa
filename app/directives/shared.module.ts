/**
 * This NgModule exports shared directives used globally
 */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule }                  from '@angular/common';
import { FormsModule }                   from '@angular/forms';

import { TAB_DIRECTIVES }       from 'ng2-bootstrap';
import { ACCORDION_DIRECTIVES } from 'ng2-bootstrap';
import { AlertComponent }       from 'ng2-bootstrap';
import { TYPEAHEAD_DIRECTIVES } from 'ng2-bootstrap';
import { DROPDOWN_DIRECTIVES }  from 'ng2-bootstrap';

import { FroalaEditorCompnoent } from "ng2-froala-editor/ng2-froala-editor";

import { CategoryTreeComponent }     from './category-tree.component';
import { EditorPageHeaderComponent } from './editor-page-header.component';
import { ListPageHeaderComponent }   from './list-page-header.component';
import { ListPageMenuComponent }     from './list-page-menu.component';
import { FastEditPostFormComponent } from './fast-edit-post-form.component';
import { PostCttCloudComponent}      from './post-ctt-cloud.component';
import { SearchBoxComponent }        from './search-box.component';
import { TagCloudComponent }         from './tag-cloud.component';
import { TopicCloudComponent }       from './topic-cloud.component';
import { DateFilterComponent }       from './date-filter.component';

@NgModule({
    imports: [ CommonModule, FormsModule ],
    declarations: [
        TAB_DIRECTIVES,
        ACCORDION_DIRECTIVES,
        TYPEAHEAD_DIRECTIVES,
        DROPDOWN_DIRECTIVES,
        AlertComponent,

        FroalaEditorCompnoent,

        ListPageHeaderComponent,
        ListPageMenuComponent,
        CategoryTreeComponent,
        EditorPageHeaderComponent,
        FastEditPostFormComponent,
        PostCttCloudComponent,
        SearchBoxComponent,
        TagCloudComponent,
        TopicCloudComponent,
        DateFilterComponent,
    ],
    exports: [
        TAB_DIRECTIVES,
        ACCORDION_DIRECTIVES,
        TYPEAHEAD_DIRECTIVES,
        DROPDOWN_DIRECTIVES,
        AlertComponent,

        FroalaEditorCompnoent,
        
        ListPageHeaderComponent,
        ListPageMenuComponent,
        CategoryTreeComponent,
        EditorPageHeaderComponent,
        FastEditPostFormComponent,
        PostCttCloudComponent,
        SearchBoxComponent,
        TagCloudComponent,
        TopicCloudComponent,
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