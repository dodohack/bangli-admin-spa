/**
 * This is a container component, normally used in post/posts, topic/topics,
 * product/products page, it is a multiple purpose panel.
 */
import { Component }      from '@angular/core';
import { Input, Output }  from '@angular/core';
import { EventEmitter }   from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { User }           from '../../models';
import { Preference }     from '../../models';

@Component({
    selector: 'right-panel',
    template: require('./right-panel.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RightPanel {

    @Input() width: string; // Panel width with pixel, say, '600px'
    get right() { return '-' + this.width; } // Panel position offset the screen
    @Input() scrollY: boolean; // overflow-y: scroll on panel-content

    @Input() isOpen: boolean;
    @Input() hasNav: boolean; // Show navigation bar or not
    @Input() entity: any;  // Can be a post, product, order etc
    
    @Input() auth: User;
    @Input() pref: Preference;

    @Output() toggle  = new EventEmitter();
    
    // Iterate to previous/next item with the list
    @Output() previous = new EventEmitter();
    @Output() next     = new EventEmitter();
}