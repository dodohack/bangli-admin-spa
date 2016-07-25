/**
 * This is the entry point of admin.huluwa.uk
 */

import { Component }         from '@angular/core';
import { Router }            from '@angular/router';

import { AuthService }       from './service/auth.service';
import { MenuService }       from './service/menu.service';
import { MenuComponent }     from './shared/menu';


@Component({
    selector: 'backend',
    template: 
    `
    <div class="container-fluid" style="min-width: 768px; max-width: 1400px;">
        <!-- Fixed topbar and sidebar -->
        <topbar-sidebar></topbar-sidebar>
        
        <!-- Content -->
        <div class="content" [class.full_content]="menuService.toggle">
        <router-outlet></router-outlet>
        </div>
    </div>
    `,
    directives: [MenuComponent],
    providers: [MenuService]
})
export class BackendComponent
{
    constructor(private menuService: MenuService,
                private authService: AuthService,
                private router: Router) {
        console.log("BackendComponent initialized");
        // Redirect un-authenticated user to login page
        // TODO: Check user permission as well
        if (!authService.isLoggedIn) {
            router.navigate(['/login']);
        }
    }
}

