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

import { Sidebar } from './sidebar';
import { Topbar }  from './topbar';
import { CategoryTreeComponent }     from './category-tree.component';
import { EditorPageHeaderComponent } from './editor-page-header.component';
import { ListPageHeaderComponent }   from './list-page-header.component';
import { FastEditPostFormComponent } from './fast-edit-post-form.component';
import { PaginatorComponent }        from './paginator.component';
import { PostCttCloudComponent}      from './post-ctt-cloud.component';
import { SearchBoxComponent }        from './search-box.component';
import { TagCloudComponent }         from './tag-cloud.component';
import { DateFilterComponent }       from './date-filter.component';

@NgModule({
    imports: [ CommonModule, FormsModule ],
    declarations: [
        TAB_DIRECTIVES,
        ACCORDION_DIRECTIVES,
        TYPEAHEAD_DIRECTIVES,
        DROPDOWN_DIRECTIVES,
        AlertComponent,

        Sidebar,
        Topbar,
        PaginatorComponent,
        ListPageHeaderComponent,
        CategoryTreeComponent,
        EditorPageHeaderComponent,
        FastEditPostFormComponent,
        PostCttCloudComponent,
        SearchBoxComponent,
        TagCloudComponent,
        DateFilterComponent,
    ],
    exports: [
        TAB_DIRECTIVES,
        ACCORDION_DIRECTIVES,
        TYPEAHEAD_DIRECTIVES,
        DROPDOWN_DIRECTIVES,
        AlertComponent,

        Topbar,
        Sidebar,

        PaginatorComponent,
        ListPageHeaderComponent,
        CategoryTreeComponent,
        EditorPageHeaderComponent,
        FastEditPostFormComponent,
        PostCttCloudComponent,
        SearchBoxComponent,
        TagCloudComponent,
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