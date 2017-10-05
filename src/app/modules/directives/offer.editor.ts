/**
 * Display form to edit a single offer
 */
import { Component, OnDestroy } from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter }  from '@angular/core';
import { FormControl }   from '@angular/forms';
import { ChangeDetectionStrategy } from '@angular/core';
import { Subject } from "rxjs";

import { Entity } from "../../models";

import { zh_CN }  from '../../localization';


@Component({
    selector: 'offer-editor',
    templateUrl: './offer.editor.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferEditor implements OnDestroy
{
    get zh() { return zh_CN.cms; }

    public subKeyUp: any;
    public keyUp = new Subject<string>();

    private _offer: Entity;
    @Input() set offer(value: Entity) {
        this._offer = Object.assign({}, value);
    }
    get offer(): Entity { return this._offer; }

    @Input() isNewOffer: boolean;

    // Update existing offer
    @Output() update = new EventEmitter();
    // Remove existing offer from topic
    @Output() detach = new EventEmitter();
    // Add new offer and attach it to topic
    @Output() create = new EventEmitter();

    constructor() {
        if (!this.isNewOffer)
            this.subKeyUp = this.keyUp.debounceTime(5000)
                .distinctUntilChanged()
                .subscribe((data) => this.update.emit(this.offer));
    }

    ngOnDestroy() {
        if (!this.isNewOffer)
            this.subKeyUp.unsubscribe();
    }

    // Delete the offer
    onDelete() { this.detach.emit(); }

    // Save newly created offer
    onSaveNew() { this.create.emit(this.offer) }
}
