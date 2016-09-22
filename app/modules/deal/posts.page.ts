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


    ngOnInit() {
        this.subAuth = this.store.select<AuthState>('auth')
            .subscribe(authState => this.authState = authState);

        // Dispatch an action to create or load a post
        this.dispatchLoadDealPost();
        // Load the post
        this.loadDealPost();
    }

    ngOnDestroy() {
        this.subAuth.unsubscribe();
        this.subParams.unsubscribe();
    }

    /**
     * Kick an action to load the post when URL changes
     */
    dispatchLoadDealPost() {
        this.subParams = this.route.params.subscribe(params => {
            if (Object.keys(params).length === 0) // New a post
                this.store.dispatch(EntityActions.newEntity(/* FIXME: current user id */));
            else                                  // Edit a post
                this.store.dispatch(EntityActions.loadEntity(+params['id']));
        });
    }

    loadDealPost() {
        
    }


    canDeactivate() {
        return true;
    }

}
