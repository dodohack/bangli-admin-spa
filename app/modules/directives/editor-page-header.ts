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
    /* The entity type of lists passed in */
    @Input() etype: string;

    @Input() previewUrl: string;
    
    // Entity ids or user uuid of current loaded page
    @Input() ids: number[] | string[];
    // All entities
    @Input() entities: Entity[];
    // Current entity
    @Input() entity: Entity;

    @Output() cancelEdit = new EventEmitter();

    get zh(): any { return zh_CN.cms; }
    get id() { return this.entity.id; }
    get total() { return this.ids.length; }
    get index() { return this.ids.indexOf(this.id); }
    get title() { return ENTITY_INFO[this.etype].name; }
    
    get baseUrl() { return '/' + ENTITY_INFO[this.etype].slug; }

    get prevEntityUrl() {
        let newIdx = this.index - 1;
        if (newIdx >= 0)
            return this.baseUrl + '/'+ this.ids[newIdx];
        return null;
    }

    get nextEntityUrl() {
        let newIdx = this.index + 1;
        if (newIdx < this.ids.length)
            return this.baseUrl + '/' + this.ids[newIdx];
        return null;
    }

    /**
     * FIXME: Can we remove extra check if this.entities defined?
     */
    excerptTitle(idx) {
        return idx + '. ' + this.entities[idx].title.substr(0, 15) + '...';
    }
    get prevEntityTitle() {
        let newIdx = this.index - 1;
        if (newIdx >= 0 && this.ids && this.entities)
            return this.excerptTitle(newIdx);
        return null;
    }

    get nextEntityTitle() {
        let newIdx = this.index + 1;
        if (newIdx < this.ids.length && this.ids && this.entities)
            return this.excerptTitle(newIdx);
        return null;
    }
}