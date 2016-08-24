/**
 * Shop post reducer
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
    paginator: Paginator;
};

const initialState: PostsState = {
    ids: [],
    entities: {},
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
                    post.selected = false;
                    return Object.assign(entities, { [post.id]: post });
                }, {});

            return {
                ids: [...ids],
                entities: Object.assign({}, entities),
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
                    // FIXME: 'selected' state is lost
                    entities: Object.assign({}, state.entities, {[id]: action.payload}),
                    paginator: Object.assign({}, state.paginator)
                }
            } else {
                return state;
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