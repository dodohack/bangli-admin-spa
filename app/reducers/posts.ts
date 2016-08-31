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

        case PostActions.BATCH_EDIT_POSTS: {
            return {
                ids: [...state.ids],
                editing: [...action.payload],
                entities: Object.assign({}, state.entities),
                paginator: Object.assign({}, state.paginator)
            };
        }

        case PostActions.CANCEL_BATCH_EDIT_POSTS: {
            return {
                ids: [...state.ids],
                editing: [],
                entities: Object.assign({}, state.entities),
                paginator: Object.assign({}, state.paginator)
            };
        }

        case PostActions.BATCH_EDIT_PREVIOUS_POST: {
            // DO NOTHING IF WE ARE NOT FAST EDITING SINGLE POST
            if (state.editing.length !== 1) return state;

            // Get previous post id
            let idx = state.ids.indexOf(state.editing[0]) - 1;
            if (idx < 0) idx = 0;
            const previousId = state.ids[idx];

            return {
                ids: [...state.ids],
                editing: [previousId],
                entities: Object.assign({}, state.entities),
                paginator: Object.assign({}, state.paginator)
            };
        }

        case PostActions.BATCH_EDIT_NEXT_POST: {
            // DO NOTHING IF WE ARE NOT FAST EDITING SINGLE POST
            if (state.editing.length !== 1) return state;

            // Get next post id
            let idx = state.ids.indexOf(state.editing[0]) + 1;
            if (idx > state.ids.length - 1) idx = state.ids.length - 1;
            const nextId = state.ids[idx];

            return {
                ids: [...state.ids],
                editing: [nextId],
                entities: Object.assign({}, state.entities),
                paginator: Object.assign({}, state.paginator)
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
            let newPost: Post  = new Post;
            newPost.state      = 'unsaved';
            newPost.categories = [];
            newPost.tags       = [];
            newPost.topics     = [];
            return {
                ids: [...state.ids, id],
                editing: [id],
                entities: Object.assign({}, state.entities, {[id]: newPost}),
                paginator: Object.assign({}, state.paginator)
            };
        }


        // Add a tag/topic/category to single/multiple post[s]
        case PostActions.ADD_TAG:
        case PostActions.ADD_TOPIC:
        case PostActions.ADD_CATEGORY: {
            let key = 'categories';
            if (action.type == PostActions.ADD_TAG) key = 'tags';
            if (action.type == PostActions.ADD_TOPIC) key = 'topics';

            const newPostArray = state.editing.map(id => {
                const oldPost  = state.entities[id];
                const isDup = oldPost[key]
                    .filter(item => item.id === action.payload.id);
                if (isDup && isDup.length) {
                    // Use old post in next state as nothing changes
                    return oldPost;
                } else {
                    // Create a new post
                    const newItems = [...oldPost[key], action.payload];
                    return Object.assign({}, oldPost, {[key]: newItems});
                }
            });

            let newPosts: { [id: number]: Post } = {};
            newPostArray.forEach(post => newPosts[post.id] = post);

            return {
                ids: [...state.ids],
                editing: [...state.editing],
                entities: Object.assign({}, state.entities, newPosts),
                paginator: Object.assign({}, state.paginator)
            };
        }

        // Remove a tag/topic/category from single/multiple post[s]
        case PostActions.REMOVE_TAG:
        case PostActions.REMOVE_TOPIC:
        case PostActions.REMOVE_CATEGORY: {
            let key = 'categories';
            if (action.type == PostActions.REMOVE_TAG) key = 'tags';
            if (action.type == PostActions.REMOVE_TOPIC) key = 'topics';

            const newPostArray = state.editing.map(id => {
                const oldPost = state.entities[id];
                const leftItems = oldPost[key]
                    .filter(item => item.id !== action.payload);
                // Always return a new object
                return Object.assign({}, oldPost, {[key]: leftItems});
            });

            let newPosts: { [id: number]: Post } = {};
            newPostArray.forEach(post => newPosts[post.id] = post);

            return {
                ids: [...state.ids],
                editing: [...state.editing],
                entities: Object.assign({}, state.entities, newPosts),
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