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

    @Input() authState: AuthState;

    /* The entity type of lists passed in */
    @Input() etype: string;
    
    // Entity ids or user uuid of current loaded page
    @Input() ids: number[] | string[];
    // All entities
    @Input() entities: Entity[];
    // Current entity
    @Input() entity: Entity;

    // deprecated
    @Input() entitiesState: any;
    
    @Output() cancelEdit = new EventEmitter();

    get zh(): any {
        if (this.etype === ENTITY.SHOP_PRODUCT)
            return zh_CN.product;
        else
            return zh_CN.cms;
    }

    get id() { return this.entity.id; }
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

    get prevEntityTitle() {
        let newIdx = this.index - 1;
        if (newIdx >= 0)
            return this.entities[this.ids[newIdx]].title.substr(0, 10) + '...';
        return null;
    }

    get nextEntityTitle() {
        let newIdx = this.index + 1;
        if (newIdx < this.ids.length)
            return this.entities[this.ids[newIdx]].title.substr(0, 10) + '...';
        return null;
    }
    
    
    get previewLink() {
         if (!(this.entity.id || this.entity.guid))
            return '';

        let base = this.authState.domains[this.authState.key].url + '/';

        switch (this.etype) {
            case ENTITY.CMS_TOPIC:
            //FIXME:
            // return base + ENTITY_INFO[this.etype] + '/'
            // + this.channels[this.entity.channel_id]
            // + this.entities[this.id].guid;
            //
            case ENTITY.SHOP_PRODUCT:
                return base + ENTITY_INFO[this.etype].slug + '/' + this.entity.guid;

            // Default to cms type
            default:
                return base + 'cms/' + ENTITY_INFO[this.etype].slug + '/' + this.id;
        }
    }

}