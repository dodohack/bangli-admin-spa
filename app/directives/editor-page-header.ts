import { Component, EventEmitter } from '@angular/core';
import { Input, Output }           from '@angular/core';

import { zh_CN }       from '../localization';

@Component({
    selector: 'editor-page-header',
    template: require('./editor-page-header.html')
})
export class EditorPageHeader {

    /* The type of lists passed in */
    @Input() isPost: boolean;
    @Input() isTopic: boolean;
    @Input() isProduct: boolean;
    @Input() isPage: boolean;
    @Input() isUser: boolean;

    /* Single or list of content, can be postsState, productsState etc */
    @Input() lists: any;

    get zh() {
        if (this.isProduct)
            return zh_CN.product;
        else
            return zh_CN.post;
    }

    get title() {
        if (this.isPost)    return '文章';
        if (this.isTopic)   return '专题';
        if (this.isProduct) return '产品';
        if (this.isPage)    return '页面';
        if (this.isUser)    return '用户';
    }

    get entity() {
        return this.lists.entities[this.lists.editing[0]];
    }

    get previewLink() {
        if (this.isPost)
            return 'http://www.huluwa.uk/' + this.lists.editing[0] + '.html';
        if (this.isPage)
            return 'http://www.huluwa.uk/page/' + this.entity.guid;
        if (this.isTopic)
            return 'http://www.huluwa.uk/topic/' + this.entity.guid;
        if (this.isProduct)
            return 'http://www.huluwa.uk/product/' + this.entity.guid;
    }

    /**
     * Get previous entity
     * @returns {any}
     */
    get previous() {
        let id = this.lists.editing[0];

        /* Only UsersState use uuids */
        let ids = this.lists.ids;
        if (!ids) ids = this.lists.uuids;

        let loc = ids.indexOf(id);

        if (loc !== -1 && loc > 0)
            return ids[loc - 1];

        return false;
    }

    /**
     * Get next entity
     * @returns {any}
     */
    get next() {
        let id = this.lists.editing[0];

        /* Only UsersState use uuids */
        let ids = this.lists.ids;
        if (!ids) ids = this.lists.uuids;

        let loc = ids.indexOf(id);

        if (loc !== -1 && loc < ids.length - 1)
            return ids[loc + 1];

        return false;
    }
}