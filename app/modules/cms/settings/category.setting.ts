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
    selector: 'category-setting',
    template: require('./category.setting.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategorySetting
{
    @Input() cats: Category[];
    @Input() channel: Channel;

    @Output() edit = new EventEmitter();
    @Output() remove = new EventEmitter();
    @Output() save = new EventEmitter();
}
