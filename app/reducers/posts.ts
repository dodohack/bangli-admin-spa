/**
 * Cms post reducer
 */
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action }     from '@ngrx/store';

import { Paginator }   from '../models';
import { Post }        from '../models';
import { PostActions } from '../actions';

export interface PostsState {
    ids: number[];
    editing: number[]; // Post in editing/dirty state
    entities: { [id: number]: Post };
    paginator: Paginator;
};

const initialState: PostsState = {
    ids: [],
    editing: [],
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
                    return Object.assign(entities, { [post.id]: post });
                }, {});

            return {
                ids: [...ids],
                editing: [],
                entities: Object.assign({}, entities),
                paginator: Object.assign({}, action.payload.paginator)
            };
        }

        case PostActions.SAVE_POST_SUCCESS:
        case PostActions.LOAD_POST_SUCCESS: {
            // Post id
            const id: number = +action.payload['id'];

            // Update corresponding post from current posts list or create a
            // new list with 1 element.
            // TODO: Remove id 0 post
            return {
                ids: (state.ids.indexOf(id) === -1) ? [...state.ids, id] : [...state.ids],
                editing: [id],
                entities: Object.assign({}, state.entities, {[id]: action.payload}),
                paginator: Object.assign({}, state.paginator)
            };
        }
            
        case PostActions.NEW_POST: {
            // Create a new post, we use '0' as a placeholder id
            const id = 0;
            const newPost = new Post;
            return {
                ids: [...state.ids, id],
                editing: [id],
                entities: Object.assign({}, state.entities, {[id]: newPost}),
                paginator: Object.assign({}, state.paginator)
            };
        }
            
        /* This is a must, as we can get the updated post from its subscriber */
        /*
        case PostActions.SAVE_POST: {
            const id: number = +action.payload['id'];

            return {
                ids: [...state.ids],
                editing: [...state.editing],
                entities: Object.assign({}, state.entities, {[id]: action.payload}),
                paginator: Object.assign({}, state.paginator)
            };
        }
        */

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