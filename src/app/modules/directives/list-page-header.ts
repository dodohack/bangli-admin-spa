import { Component, Input, Output } from '@angular/core';
import { EventEmitter }             from '@angular/core';
import { ChangeDetectionStrategy }  from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Channel }     from '../../models';

@Component({
    selector: 'list-page-header',
    template: require('./list-page-header.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPageHeader {
    // Entity statuses
    @Input() states: any[];

    // Cms channels
    @Input() cmsChannels: Channel[];

    // Activiate cms channel slug
    @Input() curChannelSlug: string;

    // Entity name of the list, say '文章'
    @Input() name: string;

    // Entity slug of the list, say 'post'
    @Input() slug: string;
    
    // Localization
    @Input() zh: any;
    
    // If current list is in loading, input to childview search-box
    @Input() loading: boolean;

    // If current list is loaded as pageless mode
    @Input() isPageless: boolean;

    // Advertise, shop order and voucher using inPageEdit(a popup modal), this
    // is used with newEntityEvent event.
    @Input() inPageEdit: boolean = false;
    
    @Output() newEntityEvent = new EventEmitter();
    
    @Output() togglePagelessEvent = new EventEmitter();
}
