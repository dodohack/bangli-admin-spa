/*
 * This is the template for home page
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { MenuComponent }    from '../components/menu.ts';
import { HomeProductComponent } from '../components/home-product.ts';

@Component({
    templateUrl: 'app/pages/home.html',
    directives: [MenuComponent, HomeProductComponent]
})
export class HomePage
{
    constructor(private router: Router) {}
}
