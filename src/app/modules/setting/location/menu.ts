/**
 * GeoLocation setting page menu, we have countries listed in the menu
 */
import { Component, Input }        from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Channel }                 from "../../../models";

@Component({
    selector: 'location-country-menu',
    templateUrl: './menu.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoLocationCountryMenu
{
    // Countries for the menu
    @Input() countries;
}
