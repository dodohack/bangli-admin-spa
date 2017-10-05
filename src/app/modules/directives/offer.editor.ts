/**
 * Display form to edit a single offer
 */
import { Component,OnInit } from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter }  from '@angular/core';
import { FormControl }   from '@angular/forms';
import { ChangeDetectionStrategy } from '@angular/core';

import { Entity } from "../../models";

import { zh_CN }  from '../../localization';

@Component({
    selector: 'offer-editor',
    templateUrl: './offer.editor.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferEditor
{
    get zh() { return zh_CN.cms; }

    private _offer: Entity;
    @Input() set offer(value: Entity) {
        this._offer = Object.assign({}, value);
    }

    get offer(): Entity { return this._offer; }


    @Output() save = new EventEmitter();

    // Save the offer
    onSave() {
        this.save.emit(this._offer);
    }
}
