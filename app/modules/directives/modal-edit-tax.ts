/**
 * Edit a new taxonomy
 */
import { Component }         from '@angular/core';
import { Input, Output }     from '@angular/core';
import { EventEmitter }      from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { Channel }           from "../../models";

@Component({
    selector: 'modal-edit-tax',
    template: require('./modal-edit-tax.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalEditTax
{
    @Input() taxType: string;
    @Input() tax: any;
    @Input() channels: Channel[];

    @Output() save   = new EventEmitter(); // save a tax
    @Output() remove = new EventEmitter(); // delete a tax
    @Output() cancel = new EventEmitter(); // cancel operation

    get isCategory() { return this.taxType === 'category'; }
}
