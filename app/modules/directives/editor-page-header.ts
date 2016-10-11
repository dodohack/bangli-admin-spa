import { Component, EventEmitter } from '@angular/core';
import { Input, Output }           from '@angular/core';

import { ENTITY, ENTITY_INFO } from '../../models';
import { Entity }      from '../../models';
import { AuthState }   from '../../reducers/auth';
import { zh_CN }       from '../../localization';

@Component({
    selector: 'editor-page-header',
    template: require('./editor-page-header.html')
})
export class EditorPageHeader {
    // Entity url slug
    @Input() slug: string;
    // Entity Chinese name
    @Input() name: string;
    // Translation
    @Input() zh: any;
    // Frontend preview url
    @Input() previewUrl: string;
    // FIXME: If we define ids: number[] | string[], we get build error of:
    // Cannot invoke an expression whose type lacks a call signature.
    // Entity ids or user uuid of current loaded page
    @Input() ids: number[];
    // All entities
    @Input() entities: Entity[];
    // Current entity
    @Input() entity: Entity;

    @Output() cancelEdit = new EventEmitter();

    get entityIdx() { return this.ids.indexOf(this.entity.id); }

    get prevEntityUrl() {
        let newIdx = this.entityIdx - 1;
        if (newIdx >= 0)
            return '/' + this.slug + '/'+ this.ids[newIdx];
        return null;
    }

    get nextEntityUrl() {
        let newIdx = this.entityIdx + 1;
        if (newIdx < this.ids.length)
            return '/' + this.slug + '/' + this.ids[newIdx];
        return null;
    }

    /**
     * FIXME: Can we remove extra check if this.entities defined?
     */
    excerptTitle(idx) {
        return idx + '. ' + this.entities[idx].title.substr(0, 15) + '...';
    }
    get prevEntityTitle() {
        let newIdx = this.entityIdx - 1;
        if (newIdx >= 0)
            return this.excerptTitle(newIdx);
        return null;
    }

    get nextEntityTitle() {
        let newIdx = this.entityIdx + 1;
        if (newIdx < this.ids.length)
            return this.excerptTitle(newIdx);
        return null;
    }
}