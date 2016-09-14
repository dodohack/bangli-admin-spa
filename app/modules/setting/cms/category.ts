/**
 * Cms categories settings, add/remove/update cms_categories
 */
import { Component }         from '@angular/core';
import { Input, Output }     from '@angular/core';
import { EventEmitter }      from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { Category }          from "../../../models";
import { Channel }           from "../../../models";

@Component({
    selector: 'cms-category-setting',
    template: require('./category.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CmsCategory
{
    @Input() cats: Category[];
    @Input() channel: Channel;
    
    // Cat selected
    cat: Category;

    @Output() edit = new EventEmitter();
    @Output() remove = new EventEmitter();
    
    setCat(cat) {
        this.cat = cat;
    }
}