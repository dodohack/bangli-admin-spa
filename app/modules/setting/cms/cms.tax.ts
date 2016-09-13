/**
 * Cms taxonomy settings for category, topic and tag
 */
import { Component }         from '@angular/core';
import { Input, Output }     from '@angular/core';
import { EventEmitter }      from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { Channel }           from "../../../models";

@Component({
    selector: 'cms-tax-setting',
    template: require('./cms.tax.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CmsTax
{
    @Input() taxName: string; // Taxonomy name for display
    @Input() taxes: any; // Taxonomy: category, topic or tag
    @Input() channel: Channel;

    @Output() edit = new EventEmitter();
    @Output() remove = new EventEmitter();
    @Output() save = new EventEmitter();

    get filteredTaxes() {
        return this.taxes.filter(t => t.channel_id === this.channel.id);
    }

    /*
     // Edit a tag, we should popup a modal to do this
     edit(tag: Tag) {
     console.error("Popup a modal to do edit tag: ", tag);
     }

     remove(tag: Tag) {
     console.error("Popup a modal to let user confirm remove tag: ", tag);
     }
     */
}
