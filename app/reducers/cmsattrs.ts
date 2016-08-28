import { Action }         from '@ngrx/store';

import { User }           from '../models';
import { Category }       from "../models";
import { Tag }            from "../models";
//import { PostState }      from "../models";
//import { TopicType }      from "../models";
//import { CreativeType }   from "../models";
//import { PostType }       from "../models";
import { Topic }          from "../models";

import { POST_STATES }    from '../models';
import { TOPIC_TYPES }    from '../models';
import { POST_TYPES }     from '../models';
import { CREATIVE_TYPES } from '../models';

import { PostState }      from '../models';
import { PostType }       from '../models';
import { CreativeType }   from '../models';
import { TopicType }      from '../models';

import { CmsAttrActions } from '../actions';


export interface CmsAttrsState {
    authors: User[];
    editors: User[];
    categories: Category[];
    post_topic_cats: Topic[]; // Topic cats for post
    tags: Tag[];
    // available - all available options for given attributes defined locally
    // actual    - attributes with number of posts retrieved from server
    post_states: {available: PostState[], actual: PostState[]};
    post_types:  {available: PostType[],  actual: PostType[]};
    post_creative_types: {available: CreativeType[], actual: CreativeType[]};
    topic_states: {available: PostState[], actual: PostState[]};
    topic_types: {available: TopicType[],  actual: TopicType[]};
    page_states: {available: PostState[],  actual: PostState[]};
};

const initialState: CmsAttrsState = {
    authors: [],
    editors: [],
    categories: [],
    post_topic_cats: [],
    tags: [],
    post_states: {available: POST_STATES, actual: []},
    post_types:  {available: POST_TYPES, actual: []},
    post_creative_types: {available: CREATIVE_TYPES, actual: []},
    topic_states: {available: POST_STATES, actual: []},
    topic_types:  {available: TOPIC_TYPES, actual: []},
    page_states:  {available: POST_STATES, actual: []}
};

export default function (state = initialState, action: Action): CmsAttrsState {
    switch (action.type)
    {
        case CmsAttrActions.LOAD_ALL_SUCCESS: {
            let authors: User[];
            if (action.payload.authors)
                authors = action.payload.authors;

            let editors: User[]
            if (action.payload.editors)
                editors = action.payload.editors;

            let categories: Category[];
            if (action.payload.categories)
                categories = action.payload.categories;

            let tags: Tag[];
            if (action.payload.tags)
                tags = action.payload.tags;

            let post_topic_cats: Topic[];
            if (action.payload.post_topic_cats)
                post_topic_cats = action.payload.post_topic_cats;

            let post_states: PostState[];
            if (action.payload.post_states)
                post_states = action.payload.post_states;

            let post_types: PostType[];
            if (action.payload.post_types)
                post_types = action.payload.post_types;

            let post_creative_types: CreativeType[];
            if (action.payload.post_creative_types)
                post_creative_types = action.payload.post_creative_types;

            let topic_states: PostState[];
            if (action.payload.topic_states)
                topic_states = action.payload.topic_states;

            let topic_types: TopicType[];
            if (action.payload.topic_types)
                topic_types = action.payload.topic_types;

            let page_states: PostState[];
            if (action.payload.page_states)
                page_states = action.payload.page_states;

            return {
                authors: [...authors],
                editors: [...editors],
                categories: [...categories],
                post_topic_cats: [...post_topic_cats],
                tags: [...tags],
                post_states: Object.assign({}, state.post_states, {actual: post_states}),
                post_types: Object.assign({}, state.post_types, {actual: post_types}),
                post_creative_types: Object.assign({}, state.post_creative_types, {actual: post_creative_types}),
                topic_states: Object.assign({}, state.topic_states, {actual: topic_states}),
                topic_types: Object.assign({}, state.topic_types, {actual: topic_types}),
                page_states: Object.assign({}, state.page_states, {actual: page_states})
            };
        }

        default:
            return state;
    }
}
