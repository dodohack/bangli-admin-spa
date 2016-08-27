import { Action }         from '@ngrx/store';

import { User }           from '../models';
import { Category }       from "../models";
import { Tag }            from "../models";
import { PostStatus }     from "../models";
import { PostType }       from "../models";
import { Topic }          from "../models";

import { CmsAttrActions } from '../actions';


export interface CmsAttrsState {
    authors: User[];
    editors: User[];
    categories: Category[];
    topic_cats: Topic[]; // Topic cats for post
    tags: Tag[];
    post_states: PostStatus[];
    topic_states: PostStatus[];
    page_states: PostStatus[];
    post_types: PostType[];
};

const initialState: CmsAttrsState = {
    authors: [],
    editors: [],
    categories: [],
    topic_cats: [],
    tags: [],
    post_states: [],
    topic_states: [],
    page_states: [],
    post_types: []
};

export default function (state = initialState, action: Action): CmsAttrsState {
    switch (action.type)
    {
        default:
            return state;
    }
}
