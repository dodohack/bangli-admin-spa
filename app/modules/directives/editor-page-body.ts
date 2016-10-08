/**
 * Editor page entity title, save buttons and date pickers.
 * fake_publish_at is used as front-end display and also used as 
 * the date to control publish in future(timed publish)
 */
import { Component, EventEmitter } from '@angular/core';
import { Input, Output }           from '@angular/core';

import { Entity }  from '../../models';
import { ENTITY }  from '../../models';
import { Channel } from '../../models';
import { User }    from '../../models';
import { GMT }     from '../../helper';

@Component({
    selector: 'editor-page-body',
    template: require('./editor-page-body.html')
})o
export class EditorPageBody {
    @Input() authors: User[];
    @Input() editors: User[];
    @Input() channels: Channel[];
    @Input() creativeTypes: any;
    
    @Input() entity: Entity;
    
    @Input() hasFakePublishAt: boolean;
    
    @Input() canCancel: boolean;
    @Input() canSave:   boolean;
    @Input() canPending:boolean;
    @Input() canDraft:  boolean;
    @Input() canPublish:boolean;
    
    @Output() save         = new EventEmitter();
    @Output() save2Draft   = new EventEmitter();
    @Output() save2Pending = new EventEmitter();
    @Output() save2Public  = new EventEmitter();
    
    @Output() openPanel    = new EventEmitter();
    
    // Datepicker is hidden by default
    dpHidden = true;

    /**
     * Update fake_publish_at to MySQL compatible GMT format
     */
    set fakePublishAt(value) {
        let newDate = GMT(value);
        if (newDate != this.entity.fake_published_at) {
            //this.entityDirty = true;
            this.entity.fake_published_at = newDate;
        }
    }
    get fakePublishAt() { return this.entity.fake_published_at; }


    /**
     * Entity content changed event triggered by froala editor
     * @param $event
     */
    contentChanged($event) {
        // If no timeout set, the editor will throw an exception
        setTimeout(() => {
            // Set initialized state or set entity content dirty
            //this.initialized ? this.entityDirty = true : this.initialized = true;
            this.entity.content = $event;
        });
    }
}
