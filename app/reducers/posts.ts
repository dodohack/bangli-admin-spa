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


        case PostActions.ADD_CATEGORY: {
            const postId  = state.editing[0];
            const oldPost = state.entities[postId];
            // If the category we add is already added
            let isDup = oldPost.categories
                .filter(cat => cat.id === action.payload.id);

            let newPost: Post;
            if (isDup.length) { // Do not create a new post as nothing modified
                newPost = oldPost;
            } else { // Create a new post with updated categories
                const newCats = [...oldPost.categories, action.payload];
                newPost = Object.assign({}, oldPost, {categories: newCats});
            }

            return {
                ids: [...state.ids],
                editing: [...state.editing],
                entities: Object.assign({}, state.entities, {[postId]: newPost}),
                paginator: Object.assign({}, state.paginator)
            };
        }

        case PostActions.ADD_TAG: {
            const postId  = state.editing[0];
            const oldPost = state.entities[postId];
            // If the tag we add is already added
            let isDup = oldPost.tags
                .filter(tag => tag.id === action.payload.id);

            let newPost: Post;
            if (isDup.length) { // Do not create a new post as nothing modified
                newPost = oldPost;
            } else { // Create a new post with updated tags
                const newTags = [...oldPost.tags, action.payload];
                newPost = Object.assign({}, oldPost, {tags: newTags});
            }

            return {
                ids: [...state.ids],
                editing: [...state.editing],
                entities: Object.assign({}, state.entities, {[postId]: newPost}),
                paginator: Object.assign({}, state.paginator)
            };
        }

        case PostActions.ADD_TOPIC: {
            const postId  = state.editing[0];
            const oldPost = state.entities[postId];
            // If the topic we add is already added
            let isDup = oldPost.topics
                .filter(t => t.id === action.payload.id);

            let newPost: Post;
            if (isDup.length) { // Do not create a new post as nothing modified
                newPost = oldPost;
            } else { // Create a new post with updated topics
                const newTopics = [...oldPost.topics, action.payload];
                newPost = Object.assign({}, oldPost, {topics: newTopics});
            }

            return {
                ids: [...state.ids],
                editing: [...state.editing],
                entities: Object.assign({}, state.entities, {[postId]: newPost}),
                paginator: Object.assign({}, state.paginator)
            };
        }   

        case PostActions.REMOVE_CATEGORY: {
            // TODO: state.editing should always contains 1, bulk editing does
            // not use this action
            const postId = state.editing[0];
            let newCats = state.entities[postId].categories
                .filter(cat => cat.id !== action.payload);
            let newPost: Post = Object.assign({},
                state.entities[postId], {categories: newCats});

            return {
                ids: [...state.ids],
                editing: [...state.editing],
                entities: Object.assign({}, state.entities, {[postId]: newPost}),
                paginator: Object.assign({}, state.paginator)
            };
        }

        case PostActions.REMOVE_TAG: {
            const postId = state.editing[0];
            let newTags = state.entities[postId].tags
                .filter(tag => tag.id !== action.payload);
            let newPost: Post = Object.assign({},
                state.entities[postId], {tags: newTags});

            return {
                ids: [...state.ids],
                editing: [...state.editing],
                entities: Object.assign({}, state.entities, {[postId]: newPost}),
                paginator: Object.assign({}, state.paginator)
            };
        }

        case PostActions.REMOVE_TOPIC: {
            const postId  = state.editing[0];
            let newTopics = state.entities[postId].topics
                .filter(t => t.id !== action.payload);
            let newPost: Post = Object.assign({},
                state.entities[postId], {topics: newTopics});

            return {
                ids: [...state.ids],
                editing: [...state.editing],
                entities: Object.assign({}, state.entities, {[postId]: newPost}),
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