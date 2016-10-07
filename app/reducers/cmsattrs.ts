import { Action }         from '@ngrx/store';
import { Observable }     from 'rxjs/Observable';

import { GeoLocation }    from '../models';
import { User }           from '../models';
import { Category }       from "../models";
import { Tag }            from "../models";
import { Topic }          from "../models";
import { Channel }        from '../models';
import { POST_STATES }    from '../models';
import { CREATIVE_TYPES } from '../models';
import { PostState }      from '../models';
import { CreativeType }   from '../models';

import { CmsAttrActions } from '../actions';


export interface CmsAttrsState {
    authors: User[];
    editors: User[];
    channels:  Channel[];
    locations: GeoLocation[];
    categories: Category[];
    post_topic_cats: Topic[]; // Topic cats for post
    tags: Tag[];
    // available - all available options for given attributes defined locally
    // actual    - attributes with number of posts retrieved from server
    post_states:         {available: PostState[],    actual: PostState[]};
    post_creative_types: {available: CreativeType[], actual: CreativeType[]};
    topic_states:        {available: PostState[],    actual: PostState[]};
    page_states:         {available: PostState[],    actual: PostState[]};
    deal_states:         {available: PostState[],    actual: PostState[]};
};

const initialState: CmsAttrsState = {
    authors: [],
    editors: [],
    channels:  [],
    locations: [],
    categories: [],
    post_topic_cats: [],
    tags: [],
    post_states: {available: POST_STATES, actual: []},
    post_creative_types: {available: CREATIVE_TYPES, actual: []},
    topic_states: {available: POST_STATES, actual: []},
    page_states:  {available: POST_STATES, actual: []},
    deal_states:  {available: POST_STATES, actual: []},
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

            let channels: Channel[];
            if (action.payload.channels)
                channels = action.payload.channels;

            let locations: GeoLocation[];
            if (action.payload.locations)
                locations = action.payload.locations;

            let post_topic_cats: Topic[];
            if (action.payload.post_topic_cats)
                post_topic_cats = action.payload.post_topic_cats;

            let post_states: PostState[];
            if (action.payload.post_states)
                post_states = action.payload.post_states;

            let post_creative_types: CreativeType[];
            if (action.payload.post_creative_types)
                post_creative_types = action.payload.post_creative_types;

            let topic_states: PostState[];
            if (action.payload.topic_states)
                topic_states = action.payload.topic_states;

            let page_states: PostState[];
            if (action.payload.page_states)
                page_states = action.payload.page_states;

            let deal_states: PostState[];
            if (action.payload.deal_states)
                deal_states = action.payload.deal_states;

            return {
                authors: [...authors],
                editors: [...editors],
                channels: [...channels],
                locations: [...locations],
                categories: [...categories],
                post_topic_cats: [...post_topic_cats],
                tags: [...tags],
                post_states: Object.assign({}, state.post_states, {actual: post_states}),
                post_creative_types: Object.assign({}, state.post_creative_types,
                    {actual: post_creative_types}),
                topic_states: Object.assign({}, state.topic_states, {actual: topic_states}),
                page_states: Object.assign({}, state.page_states, {actual: page_states}),
                deal_states: Object.assign({}, state.deal_states, {actual: deal_states})
            };
        }

        case CmsAttrActions.SAVE_GEO_LOCATION_SUCCESS:
        case CmsAttrActions.SAVE_CATEGORY_SUCCESS:
        case CmsAttrActions.SAVE_TAG_SUCCESS: {
            // Update local copy of saved category/tag
            let taxes: any;
            // Object index key to specific attributes
            let key: string;
            if (action.type === CmsAttrActions.SAVE_TAG_SUCCESS) {
                key = 'tags';
                taxes = state.tags;
            } else if (action.type === CmsAttrActions.SAVE_CATEGORY_SUCCESS) {
                key = 'categories';
                taxes = state.categories;
            } else {
                key = 'locations';
                taxes = state.locations;
            }

            let newTax   = action.payload;
            let newTaxes = taxes.map(t => {
                if (t.id === newTax.id) return newTax; // Return new one
                return t; // Return old one
            });

            return Object.assign({}, state, {key: [...newTaxes]});
        }

        case CmsAttrActions.ADD_GEO_LOCATION_SUCCESS:
        case CmsAttrActions.ADD_CATEGORY_SUCCESS:
        case CmsAttrActions.ADD_TAG_SUCCESS: {
            // Add newly added location/category/tag to local copy
            if (action.type === CmsAttrActions.ADD_TAG_SUCCESS)
                return Object.assign({}, state,
                    {tags: [...state.tags, action.payload]});
            else if (action.type === CmsAttrActions.ADD_CATEGORY_SUCCESS)
                return Object.assign({}, state,
                    {categories: [...state.categories, action.payload]});
            else
                return Object.assign({}, state,
                    {locations: [...state.locations, action.payload]});
        }

        case CmsAttrActions.DELETE_GEO_LOCATION_SUCCESS:
        case CmsAttrActions.DELETE_CATEGORY_SUCCESS:
        case CmsAttrActions.DELETE_TAG_SUCCESS: {
            // Delete local copy of deleted location/category/tag
            let taxes: any;
            let key: string;
            if (action.type === CmsAttrActions.DELETE_TAG_SUCCESS) {
                key = 'tags';
                taxes = state.tags;
            } else if (action.type === CmsAttrActions.DELETE_CATEGORY_SUCCESS) {
                key = 'categories';
                taxes = state.categories;
            } else {
                key = 'locations';
                taxes = state.locations;
            }

            let deletedId = action.payload;
            let newTaxes  = taxes.filter(t => t.id !== deletedId); 

            return Object.assign({}, state, {key: [...newTaxes]});
        }

        default:
            return state;
    }
}

/******************************************************************************
 * Helper functions
 *****************************************************************************/

/**
 * Return an array of authors
 */
export function getAuthors() {
    return (state$: Observable<CmsAttrsState>) => state$.select('authors');
}

/**
 * Return an array of editors
 */
export function getEditors() {
    return (state$: Observable<CmsAttrsState>) => state$.select('editors');
}

/**
 * Return an array of cms channels
 */
export function getChannels() {
    return (state$: Observable<CmsAttrsState>) => state$.select('channels');
}

/**
 * Return an array of cms categories
 */
export function getCategories() {
    return (state$: Observable<CmsAttrsState>) => state$.select('categories');
}

/**
 * Return an array of geo locations
 */
export function getLocations() {
    return (state$: Observable<CmsAttrsState>) => state$.select('locations');
}
