/**
 * BBS setting page, entry point of all bbs settings
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

@Component({ template: require('./bbs.page.html') })
export class BbsPage implements OnInit, OnDestroy
{
    ngOnInit() {}
    ngOnDestroy() {}
}
