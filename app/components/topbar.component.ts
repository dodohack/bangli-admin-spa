import { Component } from '@angular/core';

import { AuthService }       from '../service/auth.service';

@Component({
    selector: 'topbar',
    template:
    `
<div class="topbar">
    <ul>
        <li>
            <a href="http://www.huluwa.uk" target="_blank"><i class="fa fa-home">首页</i></a>
        </li>

        <li>
            <a [routerLink]="['/post/new']" routerLinkActive="active">
                <i class="fa fa-edit"></i>新建文章
            </a>
        </li>

        <li>
            <a [routerLink]="['/product/new']" routerLinkActive="active">
                <i class="fa fa-cart-plus"></i>新建产品
            </a>
        </li>

        <li class="float-right">
            <a [routerLink]="['/logout']" routerLinkActive="active">
                <i class="fa fa-arrow-circle-o-right"></i>退出
            </a>
        </li>

        <li class="float-right">
            <a [routerLink]="['/user/id']" routerLinkActive="active">
                <i class="fa fa-user"></i>somename
            </a>
        </li>
    </ul>
</div>
    `
})
export class TopbarComponent {

    /* username: string; */

    constructor(/*private authService: AuthService*/) {
        //this.username = authService.getName();
    }
}