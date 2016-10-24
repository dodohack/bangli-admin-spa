/**
 * Display and edit entity attributes: guid, anchor_text, website, and aff_url
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChangeDetectionStrategy }                from "@angular/core";

import { Entity }  from '../../models';
import { zh_CN }   from '../../localization';

@Component({
    selector: 'entity-permalink-edit',
    template: require('./entity-permalink-edit.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityPermalinkEdit {
    @Input() guid: string;
    @Input() anchorText: string;
    @Input() website: string;
    @Input() affiliateUrl: string;

    @Output() guidChanged       = new EventEmitter();
    @Output() anchorTextChanged = new EventEmitter();
    @Output() websiteChanged    = new EventEmitter();
    @Output() affiliateUrlChanged = new EventEmitter();
}
