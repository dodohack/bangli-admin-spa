import { Action }         from '@ngrx/store';
import { Observable }     from 'rxjs/Observable';

import { GeoLocation }    from '../models';
import { User }           from '../models';
import { Category }       from "../models";
import { Topic }          from "../models";
import { TopicType }      from "../models";
import { Channel }        from '../models';
import { POST_STATES }    from '../models';
import { CREATIVE_TYPES } from '../models';
import { PostState }      from '../models';
import { CreativeType }   from '../models';

import * as attr          from '../actions/cmsattr';


export interface CmsAttrsState {
    // Actively managed channel on some page, updated when parameter changes
    curChannel: Channel;
    authors: User[];
    editors: User[];
    channels:  Channel[];
    locations: GeoLocation[];
    categories: Category[];
    topic_types: TopicType[];
    // Topics, we do not preload them as there are too many, this entry is
    // only used when user searches for it.
    // TODO: We may preload hot topics here
    topics: Topic[];
    //tags: Tag[];
    // available - all available options for given attributes defined locally
    // actual    - attributes with number of posts retrieved from server
    post_states:         {available: PostState[],    actual: PostState[]};
    post_creative_types: {available: CreativeType[], actual: CreativeType[]};
    topic_states:        {available: PostState[],    actual: PostState[]};
    page_states:         {available: PostState[],    actual: PostState[]};
    deal_states:         {available: PostState[],    actual: PostState[]};
};

const initialState: CmsAttrsState = {
    curChannel: null,
    authors: [],
    editors: [],
    channels:  [],
    locations: [],
    categories: [],
    topic_types: [],
    topics: [],
    //tags: [],
    post_states: {available: POST_STATES, actual: []},
    post_creative_types: {available: CREATIVE_TYPES, actual: []},
    topic_states: {available: POST_STATES, actual: []},
    page_states:  {available: POST_STATES, actual: []},
    deal_states:  {available: POST_STATES, actual: []},
};

export function cmsReducer(state = initialState, action: attr.Actions | any): CmsAttrsState {
    switch (action.type)
    {
        case attr.LOAD_ALL_SUCCESS: {
            let payload = action.payload;

            let authors: User[] = [];
            if (payload.authors)
                authors = payload.authors;

            let editors: User[] = [];
            if (payload.editors)
                editors = payload.editors;

            let categories: Category[] = [];
            if (payload.categories)
                categories = payload.categories;

            let topic_types: TopicType[] = [];
            if (payload.topic_types)
                topic_types = payload.topic_types;

            let channels: Channel[] = [];
            if (payload.channels)
                channels = payload.channels;

            let locations: GeoLocation[] = [];
            if (payload.locations)
                locations = payload.locations;

            /*
            let post_topic_cats: Topic[] = [];
            if (action.payload.post_topic_cats)
                post_topic_cats = action.payload.post_topic_cats;
                */

            let post_states: PostState[] = [];
            if (payload.post_states && payload.post_states.length > 0) {
                let total = payload.post_states
                    .map(state => state.count)
                    .reduce((total, count) => total + count);
                post_states = [...payload.post_states,
                    {state: 'all', count: total}];
            }

            let post_creative_types: CreativeType[] = [];
            if (payload.post_creative_types && payload.post_creative_types.length > 0)
                post_creative_types = payload.post_creative_types;

            let topic_states: PostState[] = [];
            if (payload.topic_states && payload.topic_states.length > 0) {
                let total = payload.topic_states
                    .map(state => state.count)
                    .reduce((total, count) => total + count);
                topic_states = [...payload.topic_states,
                    {state: 'all', count: total}];
            }

            let page_states: PostState[] = [];
            if (payload.page_states && payload.page_states.length > 0) {
                let total = payload.page_states
                    .map(state => state.count)
                    .reduce((total, count) => total + count);
                page_states = [...payload.page_states,
                    {state: 'all', count: total}];
            }

            let deal_states: PostState[] = [];
            if (payload.deal_states && payload.deal_states.length > 0) {
                let total = payload.deal_states
                    .map(state => state.count)
                    .reduce((total, count) => total + count);
                deal_states = [...payload.deal_states,
                    {state: 'all', count: total}];
            }

            return {
                curChannel: null,
                authors: [...authors],
                editors: [...editors],
                channels: [...channels],
                locations: [...locations],
                categories: [...categories],
                topic_types: [...topic_types],
                topics: [],
                //tags: [...tags],
                post_states: Object.assign({}, state.post_states, {actual: post_states}),
                post_creative_types: Object.assign({}, state.post_creative_types,
                    {actual: post_creative_types}),
                topic_states: Object.assign({}, state.topic_states, {actual: topic_states}),
                page_states: Object.assign({}, state.page_states, {actual: page_states}),
                deal_states: Object.assign({}, state.deal_states, {actual: deal_states})
            };
        }

        case attr.SWITCH_CHANNEL: {
            // Switch current active channel by given channel slug or id
            let channels = state.channels
                .filter(ch => ch.slug == action.payload || ch.id == action.payload);
            if (channels.length > 0)
                return Object.assign({}, state, {curChannel: channels[0]});
            else
                return state;
        }

        case attr.SEARCH_TOPICS_SUCCESS: {
            return Object.assign({}, state, { topics: [...action.payload] });
        }

        case attr.SEARCH_TOPICS_FAIL: {
            return Object.assign({}, state, { topics: [] });
        }

        case attr.SAVE_GEO_LOCATION_SUCCESS:
        case attr.SAVE_CATEGORY_SUCCESS:
        case attr.SAVE_TOPIC_TYPE_SUCCESS:
        case attr.SAVE_TAG_SUCCESS: {
            // Update local copy of saved category/tag
            let taxes: any;
            // Object index key to specific attributes
            let key: string;
            if (action.type === attr.SAVE_TOPIC_TYPE_SUCCESS) {
                key = 'topic_types';
                taxes = state.topic_types;
            } else if (action.type === attr.SAVE_CATEGORY_SUCCESS) {
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

        case attr.ADD_GEO_LOCATION_SUCCESS:
        case attr.ADD_CATEGORY_SUCCESS:
        case attr.ADD_TOPIC_TYPE_SUCCESS:
        case attr.ADD_TAG_SUCCESS: {
            // Add newly added location/category/tag to local copy
            if (action.type === attr.ADD_TOPIC_TYPE_SUCCESS)
                return Object.assign({}, state,
                    {topic_types: [...state.topic_types, action.payload]});
            else if (action.type === attr.ADD_CATEGORY_SUCCESS)
                return Object.assign({}, state,
                    {categories: [...state.categories, action.payload]});
            else
                return Object.assign({}, state,
                    {locations: [...state.locations, action.payload]});
        }

        case attr.DELETE_GEO_LOCATION_SUCCESS:
        case attr.DELETE_CATEGORY_SUCCESS:
        case attr.DELETE_TOPIC_TYPE_SUCCESS:
        case attr.DELETE_TAG_SUCCESS: {
            // Delete local copy of deleted location/category/tag
            let taxes: any;
            let key: string;
            if (action.type === attr.DELETE_TOPIC_TYPE_SUCCESS) {
                key = 'topic_types';
                taxes = state.topic_types;
            } else if (action.type === attr.DELETE_CATEGORY_SUCCESS) {
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
export const getAuthors = (state: CmsAttrsState) => state.authors;

/**
 * Return an object of authors indexed by author id
 */
export const getAuthorsObject = (state: CmsAttrsState) =>
    state.authors.reduce((users: {[id: number]: User}, user: User) =>
    { return Object.assign(users, { [user.id]: user }); }, {});


/**
 * Return an array of editors
 */
export const getEditors = (state: CmsAttrsState) => state.editors;

/**
 * Return an object of editors indexed by editor id
 */
export const getEditorsObject = (state: CmsAttrsState) =>
    state.editors.reduce((users: {[id: number]: User}, user: User) =>
    { return Object.assign(users, { [user.id]: user }); }, {});

/**
 * Return current active channel
 */
export const getCurChannel = (state: CmsAttrsState) => state.curChannel;

/**
 * Return an array of cms channels
 */
export const getChannels = (state: CmsAttrsState) => state.channels;

/**
 * Return an object of channels indexed by channel id
 */
export const getChannelsObject = (state: CmsAttrsState) =>
    state.channels.reduce((channels: {[id: number]: Channel}, channel: Channel) =>
    { return Object.assign(channels, { [channel.id]: channel }); }, {});

/**
 * Return an array of cms categories
 */
export const getCategories = (state: CmsAttrsState) => state.categories;

/**
 * Return an array of cms categories of current active channel
 */
export const getCurChannelCategories = (state: CmsAttrsState) => {
    if (state.curChannel != null)
        return state.categories.filter(cat => cat.channel_id === state.curChannel.id);
};

/**
 * Return an array of cms topic types
 */
export const getTopicTypes = (state: CmsAttrsState) => state.topic_types;

/**
 * Return an array of cms topic types of current active channel
 */
export const getCurChannelTopicTypes = (state: CmsAttrsState) => {
    if (state.curChannel != null)
        return state.topic_types.filter(tt => tt.channel_id === state.curChannel.id);
};

/**
 * Return an array of cms topics, it is already filtered by server side
 * FIXME: Will remove the 'text' entry after replace the 3rd party directive which
 * requires it.
 */
export const getTopics = (state: CmsAttrsState) => state.topics;

/**
 * Return an array of cms topics of current active channel
 */
/*
export function getCurChannelTopics() {
    return (state$: Observable<CmsAttrsState>) => state$
        .filter( s=> s.curChannel != null)
        .map(s => s.topics.filter(t => t.channel_id === s.curChannel.id));
}
*/

/**
 * Return an array of geo locations
 */
export const getLocations = (state: CmsAttrsState) => state.locations;

export const getPostStates = (state: CmsAttrsState) => state.post_states;

export const getDealStates  = (state: CmsAttrsState) => state.deal_states;

export const getPageStates = (state: CmsAttrsState) => state.page_states;

export const getTopicStates = (state: CmsAttrsState) => state.topic_states;
