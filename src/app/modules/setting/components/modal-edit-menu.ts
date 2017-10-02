/**
 * Edit, delete or create a menu
 */
import { Component }         from '@angular/core';
import { Input, Output }     from '@angular/core';
import { EventEmitter }      from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { FeMenu }            from "../../../models";
import { Channel }           from "../../../models";

@Component({
    selector: 'modal-edit-menu',
    templateUrl: './modal-edit-menu.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalEditMenu
{
    @Input() isRoot: boolean; // If adding/editing a root menu
    @Input() isL1Menu: boolean; // If adding/editing a l1 menu
    @Input() actionType: string; // 'add' or 'edit' action of tax
    @Input() menus: FeMenu[]; // Array of all available menus
    @Input() channels: Channel[];

    // The input tax can be empty(when create a new tax)
    // Must do a local copy to edit, otherwise nothing is updated
    _menu: any;
    @Input() set menu(value) { this._menu = Object.assign({}, value); }
    get menu() { return this._menu; }

    groups = [0, 1, 2, 3, 4, 5, 6];

    orders = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
              16, 17, 18, 19, 20];


    @Output() add    = new EventEmitter(); // create a menu
    @Output() save   = new EventEmitter(); // save a menu
    @Output() remove = new EventEmitter(); // delete a menu
    @Output() cancel = new EventEmitter(); // cancel operation
}
