import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { MenuService } from '../service/menu.service';

@Component({
    selector: 'huluwa-footer',
    templateUrl: 'app/components/footer.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [ MenuService ]
})

export class FooterComponent implements OnInit {
    menus: any;
    
    constructor(private menuService: MenuService) {}

    ngOnInit() { this.getMenus(); }

    getMenus() {
        this.menuService.getMenus()
            .subscribe(
                menus => this.menus = menus,
                error => console.error(error),
                ()    => console.log('Done!')
            );
    }
}
