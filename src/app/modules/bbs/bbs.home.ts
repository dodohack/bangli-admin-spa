/**
 * This is the portal for bbs management
 */

import { Component }         from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import { AppState }          from '../../reducers';

@Component({ templateUrl: './bbs.home.html' })
export class BbsHome
{
    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>) {
    }
}
