/**
 * This NgModule exports shared directives used globally
 */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule }                  from '@angular/common';
import { FormsModule }                   from '@angular/forms';
import { ReactiveFormsModule }           from '@angular/forms';
import { RouterModule }                  from '@angular/router';

import { SelectModule }                  from 'ng2-select-compat';
import { Ng2BootstrapModule }            from 'ngx-bootstrap';
import { FileUploadModule }              from 'ng2-file-upload';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { RevisionHistory }           from './revision-history';
import { RightPanel }                from './right-panel';
import { GeoLocationCloud }          from './geo-location-cloud';
import { CategoryTree }              from './category-tree';
import { TopicCloud }                from './topic-cloud';
import { TagCloud }                  from './tag-cloud';
import { ModalEditTax }              from './modal-edit-tax';
import { ModalEditGeoLoc }           from './modal-edit-geo-loc';
import { OfferEditor }               from './offer.editor';
import { EditorPageHeader }          from './editor-page-header';
import { EntityTitleDate }           from './entity-title-date';
import { EntityButtons }             from './entity-buttons';
import { EntityAttrCloud }           from './entity-attr-cloud';
import { EntityPermalinkEdit }       from './entity-permalink-edit';
import { EntityAttributes }          from './entity-attributes';
import { EntityThumbnails }          from './entity-thumbnails';
import { EntityExcerptNote }         from './entity-excerpt-note';
import { EntityContent }             from './entity-content';
import { FastEditPostFormComponent } from './fast-edit-post-form.component';
import { ListPageHeader }            from './list-page-header';
import { ListFilterBar }             from './list-filter-bar';
import { SearchBox }                 from './search-box';
import { DateFilterComponent }       from './date-filter.component';
import { ImageUploader }             from './image-uploader';

import { MaterialModule }            from '../../material.module';


export const COMPONENTS = [
    RightPanel,
    ListPageHeader,
    ListFilterBar,
    GeoLocationCloud,
    CategoryTree,
    TopicCloud,
    TagCloud,
    EditorPageHeader,
    OfferEditor,
    EntityTitleDate,
    EntityButtons,
    EntityAttrCloud,
    EntityPermalinkEdit,
    EntityAttributes,
    EntityThumbnails,
    EntityExcerptNote,
    EntityContent,

    ModalEditTax,
    ModalEditGeoLoc,
    FastEditPostFormComponent,
    SearchBox,
    RevisionHistory,
    DateFilterComponent,
    ImageUploader,
];

@NgModule({
    imports: [
        Ng2BootstrapModule,
        FileUploadModule,
        SelectModule,

        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule ,
        FroalaEditorModule,
        FroalaViewModule,
        MaterialModule,
    ],
    declarations: COMPONENTS,
    entryComponents: [
        ModalEditTax
    ],
    exports: [
        Ng2BootstrapModule,
        SelectModule,
        FroalaEditorModule,
        FroalaViewModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,

        ...COMPONENTS
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}
