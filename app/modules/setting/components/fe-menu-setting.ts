/**
 * Frontend menu settings
 */
import { Component }         from '@angular/core';
import { Input, Output }     from '@angular/core';
import { EventEmitter }      from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { Channel }           from "../../../models";

@Component({
    selector: 'fe-menu-setting',
    template: require('./fe-menu-setting.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeMenuSetting {

    @Input() menus: any;

    @Output() edit = new EventEmitter();
    @Output() remove = new EventEmitter();
    @Output() save = new EventEmitter();
}
