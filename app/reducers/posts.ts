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
                    post.editing = false;
                    return Object.assign(entities, { [post.id]: post });
                }, {});

            return {
                ids: [...ids],
                editing: [],
                entities: Object.assign({}, entities),
                paginator: Object.assign({}, action.payload.paginator)
            };
        }

        case PostActions.LOAD_POST_SUCCESS: {
            // Post id
            const id: number = +action.payload['id'];
            // Get new post as editing mode
            let newPost: Post = Object.assign({}, action.payload, {editing: true});

            // Update corresponding post from current posts list or create a
            // new list with 1 element.
            return {
                ids: (state.ids.indexOf(id) === -1) ? [...state.ids, id] : [...state.ids],
                editing: [id],
                entities: Object.assign({}, state.entities, {[id]: newPost}),
                paginator: Object.assign({}, state.paginator)
            };
        }

        /* FIXME: Should we put the newPost in SAVE_POST_SUCCESS or SAVE_POST ? */
        /* This is a must, as we can get the updated post from its subscriber */
        case PostActions.SAVE_POST: {
            console.log("***REDUCER: SAVE POST");
            const id: number = +action.payload['id'];
            let newPost: Post = Object.assign({}, action.payload);

            return {
                ids: [...state.ids],
                editing: [...state.editing],
                entities: Object.assign({}, state.entities, {[id]: newPost}),
                paginator: Object.assign({}, state.paginator)
            };
        }

        case PostActions.SAVE_POST_SUCCESS: {
            console.log("***REDUCER: SAVE POST SUCCESS");
            return {
                ids: [...state.ids],
                editing: [...state.editing],
                entities: Object.assign({}, state.entities),
                paginator: Object.assign({}, state.paginator)
            };
        }
/*
        case PostActions.SAVE_POST_AS_DRAFT: {
            // Update post to draft status
            const post: Post = Object.assign({}, action.payload, {status: 'draft'});

            return {
                ids: [...state.ids],
                entities: Object.assign({}, state.entities, {[post.id]: post}),
                paginator: Object.assign({}, state.paginator)
            };
        }

        case PostActions.SAVE_POST_AS_PENDING: {
            // Update post to pending status
            const post: Post = Object.assign({}, action.payload, {status: 'pending'});

            return {
                ids: [...state.ids],
                entities: Object.assign({}, state.entities, {[post.id]: post}),
                paginator: Object.assign({}, state.paginator)
            };
        }

        case PostActions.SAVE_POST_AS_PUBLISH: {
            // Update post to publish status
            const post: Post = Object.assign({}, action.payload, {status: 'publish'});

            return {
                ids: [...state.ids],
                entities: Object.assign({}, state.entities, {[post.id]: post}),
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