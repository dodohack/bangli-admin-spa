import { Component, EventEmitter } from '@angular/core';
import { Input, Output }           from '@angular/core';

import { ENTITY, ENTITY_INFO } from '../../models';
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

    /* Single or list of content, can be postsState, productsState etc */
    @Input() entity: any;
    @Input() lists: any;

    get zh(): any {
        if (this.etype === ENTITY.SHOP_PRODUCT)
            return zh_CN.product;
        else
            return zh_CN.cms;
    }

    get title() { if(this.etype) return ENTITY_INFO[this.etype].name; }
    
    get baseUrl() { if (this.etype) return ENTITY_INFO[this.etype].slug; }

    get id() {
        if (this.etype === ENTITY.USER)
            return this.entity.uuid;
        else
            return this.entity.id;
    }

    get ids() {
        if (this.etype === ENTITY.USER)
            return this.lists.uuids;
        else
            return this.lists.ids;
    }
    
    get previewLink() {
        if (!(this.entity.id || this.entity.guid))
            return '';

        let base = this.authState.domains[this.authState.key].url + '/';

        switch (this.etype) {
            case ENTITY.CMS_TOPIC:
            /* FIXME:
             return base + ENTITY_INFO[this.etype] + '/'
             + this.channels[this.entity.channel_id]
             + this.entities[this.id].guid;
             */
            case ENTITY.SHOP_PRODUCT:
                return base + ENTITY_INFO[this.etype].slug + '/' + this.entity.guid;

            // Default to cms type
            default:
                return base + 'cms/' + ENTITY_INFO[this.etype].slug + '/' + this.id;
        }
    }

    /**
     * Get previous entity
     * @returns {any}
     */
    get previous() {
        let loc = this.ids.indexOf(this.id);

        if (loc !== -1 && loc > 0)
            return this.ids[loc - 1];

        return false;
    }

    /**
     * Get next entity
     * @returns {any}
     */
    get next() {
        let loc = this.ids.indexOf(this.id);

        if (loc !== -1 && loc < this.ids.length - 1)
            return this.ids[loc + 1];

        return false;
    }
}