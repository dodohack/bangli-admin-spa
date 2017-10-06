/**
 * Display form to edit a single offer
 */
import { Component, OnDestroy } from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter }  from '@angular/core';
import { FormControl }   from '@angular/forms';
import { ChangeDetectionStrategy } from '@angular/core';

import { Entity } from "../../models";

@Component({
    selector: 'offer-editor',
    templateUrl: './offer.editor.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferEditor
{
    // Modified entries of current offer
    private dirtyMask: string[] = [];

    private _offer: Entity;
    @Input() set offer(value: Entity) {
        this._offer = Object.assign({}, value);
        // Clean the dirtyMask when offer gets saved.
        //this.dirtyMask = [];
    }
    get offer(): Entity { return this._offer; }

    // Update existing offer/Save newly created offer
    @Output() save = new EventEmitter();
    // Remove existing offer from topic
    @Output() destroy = new EventEmitter();

    // Add new offer and attach it to topic
    //@Output() create = new EventEmitter();

    // Edit attribute and mark the attribute are modified.
    modify(key: string, value: any) {
        this._offer[key] = value;
        if (this.dirtyMask.indexOf(key) == -1)
            this.dirtyMask.push(key);
    }

    get isDirty() { return this.dirtyMask.length; }

    get isNew() { return this._offer.id == 0; }

    // Delete the offer
    onDestroy() { this.destroy.emit(); }

    // Update the offer of save newly created offer
    onSave() {
        if (this.isDirty)
            this.save.emit({offer: this._offer, mask: this.dirtyMask})
    }
}
