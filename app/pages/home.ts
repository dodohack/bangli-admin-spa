/**
 * Created by wanghuan on 2016/6/21.
 */

import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';


@Component({
    templateUrl: 'app/pages/home.html',
    directives: [ROUTER_DIRECTIVES]
})
export class HomePage
{
    constructor() {}
}