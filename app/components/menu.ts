import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { MenuService } from '../service/menu.service';

@Component({
    selector: 'admin-menu',
    templateUrl: 'app/components/menu.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [ MenuService ]
})
export class MenuComponent {
    constructor() {}
}