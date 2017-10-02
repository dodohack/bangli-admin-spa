/**
 * GeoLocation: area and city
 */
import { Component }               from '@angular/core';
import { Input, Output }           from '@angular/core';
import { OnChanges }               from '@angular/core';
import { EventEmitter }            from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef }       from '@angular/core';


@Component({
    selector: 'location-area',
    templateUrl: './area.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoLocationArea
{
    @Output() edit = new EventEmitter();
    @Output() add  = new EventEmitter();
    @Output() remove = new EventEmitter();
}
