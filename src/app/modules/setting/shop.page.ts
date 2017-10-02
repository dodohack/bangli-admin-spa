/**
 * Shop setting page, entry point of all shop settings
 */
import { Component, ViewChild } from '@angular/core';
import { OnInit, OnDestroy }    from '@angular/core';
import { ActivatedRoute }       from '@angular/router';
import { Store }                from '@ngrx/store';

import { AppState }          from '../../reducers';
import { Tag }               from "../../models";
import { Category }          from "../../models";
import { Topic }             from "../../models";
import { Channel }           from "../../models";

@Component({ templateUrl: './shop.page.html' })
export class ShopPage implements OnInit, OnDestroy
{
    ngOnInit() {}
    ngOnDestroy() {}
}