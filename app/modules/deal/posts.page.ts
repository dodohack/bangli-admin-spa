/**
 * List of deal posts
 */

import { Component }         from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Store }             from '@ngrx/store';

// FIXME: Replace this with Deal
import { Post, PostParams }  from '../../models';
import { AppState }          from '../../reducers';
import { AuthState }         from '../../reducers/auth';
import { EntitiesState }     from '../../reducers/entities';
import { EntityActions }     from '../../actions';

@Component({ template: require('./posts.page.html') })
export class DealPostsPage implements OnInit, OnDestroy
{
    // All subscribers, needs to unsubscribe on destory
    subAuth: any;
    subCms: any;
    subPosts: any;
    subActivityOn: any;
    subActivityOff: any;
    subParams: any;
    subQueryParams: any;

    authState:  AuthState;
    postsState: EntitiesState;

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) {}

    canDeactivate() {
        return true;
    }
}
