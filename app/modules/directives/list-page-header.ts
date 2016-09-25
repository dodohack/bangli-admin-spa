import { Component, Input, Output } from '@angular/core';
import { EventEmitter }             from '@angular/core';
import { ChangeDetectionStrategy }  from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Channel }     from '../../models';
import { ENTITY }      from '../../models';
import { ENTITY_INFO } from '../../models';
import { zh_CN }       from '../../localization';

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

    // The entity type of lists passed in
    @Input() etype: string;

    // Input to childview search-box
    @Input() loading: boolean;

    get title() { if (this.etype) return ENTITY_INFO[this.etype].name; }
    get baseUrl() { if (this.etype) return ENTITY_INFO[this.etype].slug; }
    
    navUrl($state) {
        if (this.etype === ENTITY.USER)
            return '/' + this.baseUrl + '/page/1/role/' + $state;
        else
            return '/' + this.baseUrl + '/page/1/state/' + $state;
    }

    get isCms() {
        switch(this.etype) {
            case ENTITY.CMS_POST:
            case ENTITY.CMS_TOPIC:
            case ENTITY.CMS_PAGE:
            case ENTITY.CMS_DEAL:
                return true;
            default:
                return false;
        }
    }

    get isShop() {
        switch(this.etype) {
            case ENTITY.SHOP_ORDER:
            case ENTITY.SHOP_PRODUCT:
            case ENTITY.SHOP_VOUCHER:
                return true;
            default:
                return false;
        }
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
