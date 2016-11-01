/**
 * This NgModule exports shared directives used globally
 */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule }                  from '@angular/common';
import { FormsModule }                   from '@angular/forms';
import { ReactiveFormsModule }           from '@angular/forms';
import { RouterModule }                  from '@angular/router';

import { UPLOAD_DIRECTIVES }             from 'ng2-uploader';
import { SelectModule }                  from 'ng2-select/ng2-select';
import { Ng2BootstrapModule }            from 'ng2-bootstrap/ng2-bootstrap';

//import { FroalaEditorDirective } from 'angular2-froala-wysiwyg/lib/froala.directives';
import { FroalaEditorModule } from "ng2-froala-editor/ng2-froala-editor";

import { RevisionHistory }           from './revision-history';
import { RightPanel }                from './right-panel';
import { GeoLocationCloud }          from './geo-location-cloud';
import { CategoryTree }              from './category-tree';
import { TopicCloud }                from './topic-cloud';
import { TagCloud }                  from './tag-cloud';
import { ModalEditTax }              from './modal-edit-tax';
import { ModalEditGeoLoc }           from './modal-edit-geo-loc';
import { EditorPageHeader }          from './editor-page-header';
import { EntityTitleDate }           from './entity-title-date';
import { EntityButtons }             from './entity-buttons';
import { EntityAttrCloud }           from './entity-attr-cloud';
import { EntityPermalinkEdit }       from './entity-permalink-edit';
import { EntityAttributes }          from './entity-attributes';
import { EntityThumbnails }          from './entity-thumbnails';
import { EntityExcerptNote }         from './entity-excerpt-note';
import { EntityContent }             from './entity-content';
import { DealTopicContent }          from './deal-topic-content';

import { ListPageHeader }            from './list-page-header';
import { ListFilterBar }             from './list-filter-bar';
import { SearchBox }                 from './search-box';
import { DateFilterComponent }       from './date-filter.component';

@NgModule({
    imports: [
        Ng2BootstrapModule,
        SelectModule,

        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule ,
        FroalaEditorModule,
    ],
    declarations: [
        UPLOAD_DIRECTIVES,

        RightPanel,
        ListPageHeader,
        ListFilterBar,
        GeoLocationCloud,
        CategoryTree,
        TopicCloud,
        TagCloud,
        EditorPageHeader,

        EntityTitleDate,
        EntityButtons,
        EntityAttrCloud,
        EntityPermalinkEdit,
        EntityAttributes,
        EntityThumbnails,
        EntityExcerptNote,
        EntityContent,
        DealTopicContent,

        ModalEditTax,
        ModalEditGeoLoc,
        //FastEditPostFormComponent,
        SearchBox,
        RevisionHistory,
        DateFilterComponent,
    ],
    exports: [
        Ng2BootstrapModule,
        SelectModule,
        FroalaEditorModule,

        UPLOAD_DIRECTIVES,

        RightPanel,
        ListPageHeader,
        ListFilterBar,
        GeoLocationCloud,
        CategoryTree,
        TopicCloud,
        TagCloud,

        EditorPageHeader,
        EntityTitleDate,
        EntityButtons,
        EntityAttrCloud,
        EntityPermalinkEdit,
        EntityAttributes,
        EntityThumbnails,
        EntityExcerptNote,
        EntityContent,
        DealTopicContent,

        ModalEditTax,
        ModalEditGeoLoc,
        //FastEditPostFormComponent,
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
