import { Component, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'list-page-header',
    template: require('./list-page-header.html')
})
export class ListPageHeader {
    /* The type of lists passed in */
    @Input() isPost: boolean;
    @Input() isTopic: boolean;
    @Input() isProduct: boolean;
    @Input() isOrder: boolean;
    @Input() isPage: boolean;
    @Input() isUser: boolean;


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
}
