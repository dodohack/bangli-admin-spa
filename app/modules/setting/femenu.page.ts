/**
 * Frontend menu setting page, configure the pregenerated menu for frontend
 * desktop and mobile SPA.
 */
import { Component, ViewChild } from '@angular/core';
import { OnInit, OnDestroy }    from '@angular/core';
import { ActivatedRoute }       from '@angular/router';
import { Store }                from '@ngrx/store';

import { AppState }          from '../../reducers';
import { Channel }           from "../../models";

@Component({ template: require('./femenu.page.html') })
export class FeMenuPage implements OnInit, OnDestroy
{
    ngOnInit() {}
    ngOnDestroy() {}
}
