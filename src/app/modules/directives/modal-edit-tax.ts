/**
 * Edit, delete or create a taxonomy
 */
import { Component }         from '@angular/core';
import { Input, Output }     from '@angular/core';
import { EventEmitter }      from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { Category }          from "../../models";
import { Channel }           from "../../models";

@Component({
    selector: 'modal-edit-tax',
    template: require('./modal-edit-tax.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalEditTax
{
    @Input() actionType: string; // 'add' or 'edit' action of tax
    @Input() taxType: string;
    @Input() categories: Category[]; // Array of all available categories
    @Input() channels: Channel[];
    
    // The input tax can be empty(when create a new tax)
    // Must do a local copy to edit, otherwise nothing is updated
    _tax: any;
    @Input() set tax(value) { this._tax = Object.assign({}, value); }
    get tax() { return this._tax; }


    @Output() add    = new EventEmitter(); // create a tax
    @Output() save   = new EventEmitter(); // save a tax
    @Output() remove = new EventEmitter(); // delete a tax
    @Output() cancel = new EventEmitter(); // cancel operation

    get isCategory() { return this.taxType === 'category'; }
}
