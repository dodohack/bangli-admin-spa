/**
 * This panel is normally used in post/posts, topic/topics, product/products
 * page, it is a multiple purpose panel.
 */
import { Component }      from '@angular/core';
import { Input, Output }  from '@angular/core';
import { EventEmitter }   from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { User }           from '../models';
import { Preference }     from '../models';

@Component({
    selector: 'right-panel',
    template: require('./right-panel.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RightPanel {

    // Panel width with pixel, say, '600px'
    @Input() width: string;
    // Panel position in hide
    get right() { return '-' + this.width; }

    @Input() isOpen: boolean;

    @Input() hasNav: boolean; // Show navigation bar or not
    @Input() auth: User;
    @Input() pref: Preference;

    @Output() toggle = new EventEmitter();
}