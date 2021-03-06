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
import {ENTITY} from "../models/entity";


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
    post_statuses:         {available: PostState[],    actual: PostState[]};
    topic_statuses:        {available: PostState[],    actual: PostState[]};
    page_statuses:         {available: PostState[],    actual: PostState[]};
    offer_statuses:        {available: PostState[],    actual: PostState[]};
    ad_statuses:           {available: PostState[],    actual: PostState[]};
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
    post_statuses:  {available: POST_STATES, actual: []},
    topic_statuses: {available: POST_STATES, actual: []},
    page_statuses:  {available: POST_STATES, actual: []},
    offer_statuses: {available: POST_STATES, actual: []},
    ad_statuses:    {available: POST_STATES, actual: []},
};


/**
 * Calculate all status from each count from each status
 * @param inStatus
 * @returns {PostState[]}
 */
function getTotalStatus(inStatus: PostState[])
{
    let newStatus: PostState[] = [];
    if (inStatus && inStatus.length > 0) {
        let total = inStatus.map(state => state.count)
            .reduce((total, count) => total + count);
        newStatus = [...inStatus, {status: 'all', count: total}];
    }

    return newStatus;
}


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


            let post_statuses  = getTotalStatus(payload.post_status);
            let topic_statuses = getTotalStatus(payload.topic_status);
            let page_statuses  = getTotalStatus(payload.page_status);
            let offer_statuses = getTotalStatus(payload.offer_status);
            let ad_statuses    = getTotalStatus(payload.ad_status);

            return {
                curChannel: state.curChannel,
                authors: [...authors],
                editors: [...editors],
                channels: [...channels],
                locations: [...locations],
                categories: [...categories],
                topic_types: [...topic_types],
                topics: [],
                //tags: [...tags],
                post_statuses:  Object.assign({}, state.post_statuses, {actual: post_statuses}),
                topic_statuses: Object.assign({}, state.topic_statuses, {actual: topic_statuses}),
                page_statuses:  Object.assign({}, state.page_statuses, {actual: page_statuses}),
                offer_statuses: Object.assign({}, state.offer_statuses, {actual: offer_statuses}),
                ad_statuses: Object.assign({}, state.ad_statuses, {actual: ad_statuses})
            };
        }

        // update individually entity status
        case attr.LOAD_ENTITY_STATUS_SUCCESS: {
            let etype  = action.payload.etype;
            let status = action.payload.data;

            let newStatus = getTotalStatus(status);
            switch(etype) {
                case ENTITY.POST:
                    return Object.assign({}, state, {
                        post_statuses: {
                            available: state.post_statuses.available,
                            actual: newStatus
                        }
                    });
                case ENTITY.PAGE:
                    return Object.assign({}, state, {
                        page_statuses: {
                            available: state.page_statuses.available,
                            actual: newStatus
                        }
                    });
                case ENTITY.TOPIC:
                    return Object.assign({}, state, {
                        topic_statuses: {
                            available: state.topic_statuses.available,
                            actual: newStatus
                        }
                    });
                case ENTITY.OFFER:
                    return Object.assign({}, state, {
                        offer_statuses: {
                            available: state.offer_statuses.available,
                            actual: newStatus
                        }
                    });
                case ENTITY.ADVERTISE:
                    return Object.assign({}, state, {
                        ad_statuses: {
                            available: state.ad_statuses.available,
                            actual: newStatus
                        }
                    });
                default:
                    console.error("Unhandled etype");
                    return state;
            }
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

export const getPostStates = (state: CmsAttrsState) => state.post_statuses;

export const getOfferStates  = (state: CmsAttrsState) => state.offer_statuses;

export const getPageStates = (state: CmsAttrsState) => state.page_statuses;

export const getTopicStates = (state: CmsAttrsState) => state.topic_statuses;

export const getAdStates = (state: CmsAttrsState) => state.ad_statuses;
