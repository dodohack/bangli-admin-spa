/**
 * Add a new taxonomy
 */
import { Component }         from '@angular/core';
import { Input, Output }     from '@angular/core';
import { EventEmitter }      from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { Channel }           from "../../models";

@Component({
    selector: 'modal-add-tax',
    template: require('./modal-add-tax.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalAddTax 
{
    @Input() taxType: string;
    @Input() channels: Channel[];

    @Output() save   = new EventEmitter();
    @Output() cancel = new EventEmitter();

    // An object to save newly added taxonomy
    tax: any = {name: null, slug: null, parent_id: null, channel_id: null};
    
    get isCategory() { return this.taxType === 'category'; }
}
