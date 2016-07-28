/**
 * Created by wanghuan on 2016/6/20.
 */

import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

let template = require('./seo.html');
@Component({
    template: template,
    directives: [ROUTER_DIRECTIVES]
})
export class SeoPage
{
    constructor() {}
}
