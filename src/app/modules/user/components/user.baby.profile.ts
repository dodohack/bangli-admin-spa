/**
 * Display user baby profiles
 * shop_managers can see this
 */
import { Component, Input } from '@angular/core';
import { User } from "../../../models";

@Component({
    selector: 'user-baby-profile',
    templateUrl: './user.baby.profile.html'
})
export class UserBabyProfileTab
{
    @Input() isMyProfile: boolean;
    @Input() isAdminUser: boolean;
    @Input() user: User;
    
    get hasBabyProfile() { 
        return this.user && this.user.baby_profiles 
            && this.user.baby_profiles.length > 0;
    }
}
