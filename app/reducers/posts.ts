/**
 * Cms post reducer
 */
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action }     from '@ngrx/store';

import { cmsReducer }  from './cms.generic';

import { Paginator }   from '../models';
import { Post }        from '../models';
import { PostActions } from '../actions';

export interface PostsState {
    ids: number[];
    editing: number[]; // Post in editing state
    entities: { [id: number]: Post };
    paginator: Paginator;
};

const initialState: PostsState = {
    ids: [],
    editing: [],
    entities: {},
    paginator: new Paginator
};

// This reducer is commonized to cmsReducer
export default function (state = initialState, action: Action): PostsState {
    return cmsReducer<Post, PostActions, PostsState>(state, action);
}

/**
 * Return a post from current post list by id
 */
export function getPost(id: number) {
    return (state$: Observable<PostsState>) =>
        state$.select(s => s.entities[id]);
}
