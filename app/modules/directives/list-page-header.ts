import { Component, Input, Output } from '@angular/core';
import { EventEmitter }             from '@angular/core';
import { ChangeDetectionStrategy }  from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Channel }                  from '../../models';

import { zh_CN } from '../../localization';

@Component({
    selector: 'list-page-header',
    template: require('./list-page-header.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPageHeader {

    // States of given list
    @Input() states: any[];

    // Cms channels
    @Input() cmsChannels: Channel[];

    // Activiate cms channel
    @Input() activeChannel: Channel;

    // The type of lists passed in
    @Input() isPost: boolean;
    @Input() isTopic: boolean;
    @Input() isProduct: boolean;
    @Input() isOrder: boolean;
    @Input() isPage: boolean;
    @Input() isUser: boolean;

    // Input to childview search-box
    @Input() loading: boolean;

    get title() {
        if (this.isPost)    return '文章';
        if (this.isTopic)   return '专题';
        if (this.isProduct) return '产品';
        if (this.isOrder)   return '订单';
        if (this.isPage)    return '页面';
        if (this.isUser)    return '用户';
    }
    
    get baseUrl() {
        if (this.isPost)    return 'post';
        if (this.isTopic)   return 'topic';
        if (this.isProduct) return 'product';
        if (this.isOrder)   return 'order';
        if (this.isPage)    return 'page';
        if (this.isUser)    return 'user';
    }
    
    navUrl($state) {
        if (this.isUser)
            return '/' + this.baseUrl + '/page/1/role/' + $state;
        else
            return '/' + this.baseUrl + '/page/1/state/' + $state;
    }

    get isCms() {
        return (this.isPost || this.isTopic || this.isPage) ? true : false;
    }

    get isShop() {
        return (this.isOrder || this.isProduct) ? true : false;
    }

    get total() {
        if (!this.states || !this.states.length) return 0;

        return this.states.map(state => state.count)
            .reduce((total, count) => total + count);
    }
    
    get zh() {
        if (this.isCms)
            return zh_CN.cms;
        else
            return zh_CN[this.baseUrl];
    }
}
