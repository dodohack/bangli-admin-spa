/**
 * Location setting page menu, we have countries listed in the menu 
 */
import { Component, Input }        from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Channel }                 from "../../../models";

@Component({
    selector: 'location-country-menu',
    template: require('./menu.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationCountryMenu
{
    // Countries for the menu
    @Input() countries;
}
