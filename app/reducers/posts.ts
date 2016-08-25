/**
 * Cms post reducer
 */
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action }     from '@ngrx/store';

import { Paginator }      from '../models';
import { Post }        from '../models';
import { PostActions } from '../actions';

export interface PostsState {
    ids: number[];
    entities: { [id: number]: Post };
    editing: number[]; // Posts in editing mode
    //selected: number[]; // Posts selected? FIXME: Can we use 'editing' instead?
    paginator: Paginator;
};

const initialState: PostsState = {
    ids: [],
    entities: {},
    editing: [],
    //selected: [],
    paginator: new Paginator
};

export default function (state = initialState, action: Action): PostsState {
    switch (action.type)
    {
        case PostActions.SEARCH_COMPLETE:
        case PostActions.LOAD_POSTS_SUCCESS: {
            const posts: Post[] = action.payload.posts;
            const ids: number[]       = posts.map(p => p.id);
            const entities            = posts.reduce(
                (entities: { [id: number]: Post }, post: Post) => {
                    return Object.assign(entities, { [post.id]: post });
                }, {});

            return {
                ids: [...ids],
                entities: Object.assign({}, entities),
                editing: [],
                paginator: Object.assign({}, action.payload.paginator)
            };
        }

        case PostActions.LOAD_POST_SUCCESS: {
            // Post id
            const id: number = +action.payload['id'];

            // Update corresponding post from current posts list with
            // detailed information.
            if (state.ids.indexOf(id) !== -1) {
                return {
                    ids: [...state.ids],
                    entities: Object.assign({}, state.entities, {[id]: action.payload}),
                    // Set current post in editing mode
                    editing: [id],
                    paginator: Object.assign({}, state.paginator)
                }
            } else {
                // Return the single post in the PostsState
                return {
                    ids: [id],
                    entities: Object.assign({}, {[id]: action.payload}),
                    editing: [id],
                    // paginator should be empty
                    paginator: Object.assign({}, state.paginator)
                };
            }
        }

        default:
            return state;
    }
}

/**
 * Return a post from current post list by id
 */
export function getPost(id: number) {
    return (state$: Observable<PostsState>) =>
        state$.select(s => s.entities[id]);
}