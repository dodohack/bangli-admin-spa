import { Component, EventEmitter } from '@angular/core';
import { Input, Output }           from '@angular/core';

import { AuthState }   from '../../reducers/auth';
import { zh_CN }       from '../../localization';

@Component({
    selector: 'editor-page-header',
    template: require('./editor-page-header.html')
})
export class EditorPageHeader {

    @Input() authState: AuthState;

    /* The type of lists passed in */
    @Input() isPost: boolean;
    @Input() isTopic: boolean;
    @Input() isProduct: boolean;
    @Input() isPage: boolean;
    @Input() isUser: boolean;

    /* Single or list of content, can be postsState, productsState etc */
    @Input() entity: any;
    @Input() lists: any;

    get zh(): any {
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
    
    get baseUrl() {
        if (this.isPost)    return 'post';
        if (this.isTopic)   return 'topic';
        if (this.isProduct) return 'product';
        if (this.isPage)    return 'page';
        if (this.isUser)    return 'user';        
    }

    get id() {
        if (this.isUser)
            return this.entity.uuid;
        else
            return this.entity.id;
    }

    get ids() {
        if (this.isUser)
            return this.lists.uuids;
        else
            return this.lists.ids;
    }
    
    get previewLink() {
        let url = this.authState.domains[this.authState.key].url + '/';
        if (this.isPost)
            return url + this.entity.id + '.html';
        if (this.isPage)
            return url + 'page/' + this.entity.guid;
        if (this.isTopic)
            return url + 'topic/' + this.entity.guid;
        if (this.isProduct)
            return url + 'product/' + this.entity.guid;
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