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

import { CmsAttrActions } from '../actions';


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

export default function (state = initialState, action: Action): CmsAttrsState {
    switch (action.type)
    {
        case CmsAttrActions.LOAD_ALL_SUCCESS: {
            let payload = action.payload;

            let authors: User[] = [];
            if (payload.authors)
                authors = payload.authors.map(u => {
                    // Create a 'text' key for ng2-select.
                    u.text = u.display_name;
                    return u;
                });

            let editors: User[] = [];
            if (payload.editors)
                editors = payload.editors.map(u => {
                    // Create a 'text' key for ng2-select.
                    u.text = u.display_name;
                    return u;
                });

            let categories: Category[] = [];
            if (payload.categories)
                categories = payload.categories.map(u => {
                    // Create a 'text' key for ng2-select.
                    u.text = u.name;
                    return u;
                });

            let topic_types: TopicType[] = [];
            if (payload.topic_types)
                topic_types = payload.topic_types.map(u => {
                    u.text = u.name;
                    return u;
                });

            let channels: Channel[] = [];
            if (payload.channels && payload.channels.length)
                channels = payload.channels.map(u => {
                    u.text = u.name;
                    return u;
                });

            let locations: GeoLocation[] = [];
            if (payload.locations && payload.locations.length)
                locations = payload.locations.map(u => {
                    u.text = u.name;
                    return u;
                });

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

        case CmsAttrActions.SWITCH_CHANNEL: {
            // Switch current active channel by given channel slug or id
            let channels = state.channels
                .filter(ch => ch.slug == action.payload || ch.id == action.payload);
            if (channels.length > 0)
                return Object.assign({}, state, {curChannel: channels[0]});
            else
                return state;
        }

        case CmsAttrActions.SEARCH_TOPICS_SUCCESS: {
            return Object.assign({}, state, { topics: [...action.payload] });
        }

        case CmsAttrActions.SEARCH_TOPICS_FAIL: {
            return Object.assign({}, state, { topics: [] });
        }

        case CmsAttrActions.SAVE_GEO_LOCATION_SUCCESS:
        case CmsAttrActions.SAVE_CATEGORY_SUCCESS:
        case CmsAttrActions.SAVE_TOPIC_TYPE_SUCCESS:
        case CmsAttrActions.SAVE_TAG_SUCCESS: {
            // Update local copy of saved category/tag
            let taxes: any;
            // Object index key to specific attributes
            let key: string;
            if (action.type === CmsAttrActions.SAVE_TOPIC_TYPE_SUCCESS) {
                key = 'topic_types';
                taxes = state.topic_types;
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
        case CmsAttrActions.ADD_TOPIC_TYPE_SUCCESS:
        case CmsAttrActions.ADD_TAG_SUCCESS: {
            // Add newly added location/category/tag to local copy
            if (action.type === CmsAttrActions.ADD_TOPIC_TYPE_SUCCESS)
                return Object.assign({}, state,
                    {topic_types: [...state.topic_types, action.payload]});
            else if (action.type === CmsAttrActions.ADD_CATEGORY_SUCCESS)
                return Object.assign({}, state,
                    {categories: [...state.categories, action.payload]});
            else
                return Object.assign({}, state,
                    {locations: [...state.locations, action.payload]});
        }

        case CmsAttrActions.DELETE_GEO_LOCATION_SUCCESS:
        case CmsAttrActions.DELETE_CATEGORY_SUCCESS:
        case CmsAttrActions.DELETE_TOPIC_TYPE_SUCCESS:
        case CmsAttrActions.DELETE_TAG_SUCCESS: {
            // Delete local copy of deleted location/category/tag
            let taxes: any;
            let key: string;
            if (action.type === CmsAttrActions.DELETE_TOPIC_TYPE_SUCCESS) {
                key = 'topic_types';
                taxes = state.topic_types;
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
    return (state$: Observable<CmsAttrsState>) => state$.select(s => s.authors);
}

/**
 * Return an object of authors indexed by author id
 */
export function getAuthorsObject() {
    return (state$: Observable<CmsAttrsState>) => state$
        .select(s => s.authors).map(authors =>
            authors.reduce((users: {[id: number]: User}, user: User) => {
                return Object.assign(users, { [user.id]: user });
            }, {}));
}

/**
 * Return an array of editors
 */
export function getEditors() {
    return (state$: Observable<CmsAttrsState>) => state$.select(s => s.editors);
}

/**
 * Return an object of editors indexed by editor id
 */
export function getEditorsObject() {
    return (state$: Observable<CmsAttrsState>) => state$
        .select(s => s.editors).map(editors =>
            editors.reduce((users: {[id: number]: User}, user: User) => {
                return Object.assign(users, { [user.id]: user });
            }, {}));
}

/**
 * Return current active channel
 */
export function getCurChannel() {
    return (state$: Observable<CmsAttrsState>) => state$.select(s => s.curChannel);
}

/**
 * Return an array of cms channels
 */
export function getChannels() {
    return (state$: Observable<CmsAttrsState>) => state$.select(s => s.channels);
}


/**
 * Return an object of channels indexed by channel id
 */
export function getChannelsObject() {
    return (state$: Observable<CmsAttrsState>) => state$
        .select(s => s.channels).map(channels =>
            channels.reduce((channels: {[id: number]: Channel}, channel: Channel) => {
                return Object.assign(channels, { [channel.id]: channel });
            }, {}));
}

/**
 * Return an array of cms categories
 */
export function getCategories() {
    return (state$: Observable<CmsAttrsState>) => state$.select(s => s.categories);
}

/**
 * Return an array of cms categories of current active channel
 */
export function getCurChannelCategories() {
    return (state$: Observable<CmsAttrsState>) => state$
        .filter(s => s.curChannel != null)
        .map(s => s.categories.filter(cat => cat.channel_id === s.curChannel.id));
}

/**
 * Return an array of cms topic types
 */
export function getTopicTypes() {
    return (state$: Observable<CmsAttrsState>) => state$.select(s => s.topic_types);
}

/**
 * Return an array of cms topic types of current active channel
 */
export function getCurChannelTopicTypes() {
    return (state$: Observable<CmsAttrsState>) => state$
        .filter(s => s.curChannel != null)
        .map(s => s.topic_types.filter(tt => tt.channel_id === s.curChannel.id));
}

/**
 * Return an array of cms topics, it is already filtered by server side
 */
export function getTopics() {
    return (state$: Observable<CmsAttrsState>) => state$
        .select(s => s.topics)
        .map(ts => ts.map(t => Object.assign({}, t, {text: t.title})));
}

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
export function getLocations() {
    return (state$: Observable<CmsAttrsState>) => state$.select(s => s.locations);
}

export function getPostStates() {
    return (state$: Observable<CmsAttrsState>) => state$.select(s => s.post_states);
}

export function getDealStates() {
    return (state$: Observable<CmsAttrsState>) => state$.select(s => s.deal_states);
}

export function getPageStates() {
    return (state$: Observable<CmsAttrsState>) => state$.select(s => s.page_states);
}

export function getTopicStates() {
    return (state$: Observable<CmsAttrsState>) => state$.select(s => s.topic_states);
}