/**
 * Action to get CMS attributes, includes:
 * authors, editors, categories, tags, topic_cats, statuses, channels etc
 */
import { Action }          from '@ngrx/store';
import { GeoLocation }     from '../models';
import { Category }        from '../models';
import { Tag }             from '../models';
import { Topic }           from '../models';
import { TopicType }       from '../models';
import { AuthState }       from '../reducers/auth';
import { CmsAttrsState }   from '../reducers/cmsattrs';

export const LOAD_ALL = '[CmsAttr] Load All';
export const LOAD_ALL_SUCCESS = '[CmsAttr] Load All Success';
export const LOAD_ALL_FAIL = '[CmsAttr] Load All Fail';
export const SWITCH_CHANNEL = '[CmsAttr] Switch Channel';
export const LOAD_CATEGORIES = '[CmsAttr] Load Categories';
export const LOAD_TAGS = '[CmsAttr] Load Tags';
export const SEARCH_TOPICS = '[CmsAttr] Search Topics';
export const LOAD_TOPICS = '[CmsAttr] Load Topics';
export const LOAD_CATEGORIES_SUCCESS = '[CmsAttr] Load Categories Success';
export const LOAD_TAGS_SUCCESS = '[CmsAttr] Load Tags Success';
export const SEARCH_TOPICS_SUCCESS = '[CmsAttr] Search Topics Success';
export const SEARCH_TOPICS_FAIL = '[CmsAttr] Search Topics Fail';
export const LOAD_ATTR_FAIL = '[CmsAttr] Load Attr Fail';
export const ADD_GEO_LOCATION = '[CmsAttr] Add Geo Location';
export const ADD_GEO_LOCATION_SUCCESS = '[CmsAttr] Add Geo Location Success';
export const SAVE_GEO_LOCATION = '[CmsAttr] Edit Geo Location';
export const SAVE_GEO_LOCATION_SUCCESS = '[CmsAttr] Save Geo Location Success';
export const DELETE_GEO_LOCATION = '[CmsAttr] Delete Geo Location';
export const DELETE_GEO_LOCATION_SUCCESS = '[CmsAttr] Delete Geo Location Success';
export const ADD_TAG = '[CmsAttr] Add Tag';
export const ADD_CATEGORY = '[CmsAttr] Add Category';
export const ADD_TOPIC_TYPE = '[CmsAttr] Add Topic Type';
export const SAVE_TAG = '[CmsAttr] Save Tag';
export const SAVE_CATEGORY = '[CmsAttr] Save Category';
export const SAVE_TOPIC_TYPE = '[CmsAttr] Save Topic Type';
export const DELETE_TAG = '[CmsAttr] Delete Tag';
export const DELETE_CATEGORY = '[CmsAttr] Delete Category';
export const DELETE_TOPIC_TYPE = '[CmsAttr] Delete Topic Type';
export const SAVE_CATEGORY_SUCCESS = '[CmsAttr] Save Category Success';
export const SAVE_TAG_SUCCESS = '[CmsAttr] Save Tag Success';
export const SAVE_TOPIC_TYPE_SUCCESS = '[CmsAttr] Save Topic Type Success';
export const ADD_CATEGORY_SUCCESS = '[CmsAttr] Add Category Success';
export const ADD_TAG_SUCCESS = '[CmsAttr] Add Tag Success';
export const ADD_TOPIC_TYPE_SUCCESS = '[CmsAttr] Add Topic Type Success';
export const DELETE_CATEGORY_SUCCESS = '[CmsAttr] Delete Category Success';
export const DELETE_TAG_SUCCESS = '[CmsAttr] Delete Tag Success';
export const DELETE_TOPIC_TYPE_SUCCESS = '[CmsAttr] Delete Topic Type Success';
export const SAVE_FAIL = '[CmsAttr] Save Fail';

export class LoadAll implements Action {
    readonly type = LOAD_ALL;
    // Payload: key
    constructor(public payload: string = undefined) {}
}

export class LoadAllSuccess implements Action {
    readonly type = LOAD_ALL_SUCCESS;
    constructor(public payload: CmsAttrsState) {}
}

export class LoadAllFail implements Action {
    readonly type = LOAD_ALL_FAIL;
}

export class SwitchChannel implements Action {
    readonly type = SWITCH_CHANNEL;
    // Payload: channel slug or id
    constructor(public payload: string | number) {}
}

export class LoadCategories implements Action {
    readonly type = LOAD_CATEGORIES;
    constructor(public payload: AuthState) {}
}

export class LoadTags implements Action {
    readonly type = LOAD_TAGS;
    constructor(public payload: AuthState) {}
}

export class SearchTopics implements Action {
    readonly type = SEARCH_TOPICS;
    // Payload: topic type id and topic title/slug
    constructor(public payload: {ttid: number, text: string}) {}
}

export class LoadTopics implements Action {
    readonly type = LOAD_TOPICS;
    constructor(public payload: AuthState) {}
}

export class LoadCategoriesSuccess implements Action {
    readonly type = LOAD_CATEGORIES_SUCCESS;
    constructor(public payload: Category[]) {}
}

export class LoadTagsSuccess implements Action {
    readonly type = LOAD_TAGS_SUCCESS;
    constructor(public payload: Tag[]) {}
}

export class SearchTopicsSuccess implements Action {
    readonly type = SEARCH_TOPICS_SUCCESS;
    constructor(public payload: Topic[]) {}
}

export class SearchTopicsFail implements Action {
    readonly type = SEARCH_TOPICS_FAIL;
}

export class LoadAttrFail implements Action {
    readonly type = LOAD_ATTR_FAIL;
}

export class AddGeoLocation implements Action {
    readonly type = ADD_GEO_LOCATION;
    constructor(public payload: GeoLocation) {}
}

export class AddGeoLocationSuccess implements Action {
    readonly type = ADD_GEO_LOCATION_SUCCESS;
    constructor(public payload: GeoLocation) {}
}

export class SaveGeoLocation implements Action {
    readonly type = SAVE_GEO_LOCATION;
    constructor(public payload: GeoLocation) {}
}

export class SaveGeoLocationSuccess implements Action {
    readonly type = SAVE_GEO_LOCATION_SUCCESS;
    constructor(public payload: GeoLocation) {}
}

export class DeleteGeoLocation implements Action {
    readonly type = DELETE_GEO_LOCATION;
    constructor(public payload: GeoLocation) {}
}

export class DeleteGeoLocationSuccess implements Action {
    readonly type = DELETE_GEO_LOCATION_SUCCESS;
    // Payload: Geolocation ID
    constructor(public payload: number) {}
}

export class AddTag implements Action {
    readonly type = ADD_TAG;
    constructor(public payload: Tag) {}
}

export class AddCategory implements Action {
    readonly type = ADD_CATEGORY;
    constructor(public payload: Category) {}
}

export class AddTopicType implements Action {
    readonly type = ADD_TOPIC_TYPE;
    constructor(public payload: TopicType) {}
}

export class SaveTag implements Action {
    readonly type = SAVE_TAG;
    constructor(public payload: Tag) {}
}

export class SaveCategory implements Action {
    readonly type = SAVE_CATEGORY;
    constructor(public payload: Category) {}
}

export class SaveTopicType implements Action {
    readonly type = SAVE_TOPIC_TYPE;
    constructor(public payload: TopicType) {}
}

export class DeleteTag implements Action {
    readonly type = DELETE_TAG;
    constructor(public payload: Tag) {}
}

export class DeleteCategory implements Action {
    readonly type = DELETE_CATEGORY;
    constructor(public payload: Category) {}
}

export class DeleteTopicType implements Action {
    readonly type = DELETE_TOPIC_TYPE;
    constructor(public payload: TopicType) {}
}

export class SaveCategorySuccess implements Action {
    readonly type = SAVE_CATEGORY_SUCCESS;
    constructor(public payload: Category) {}
}

export class SaveTagSuccess implements Action {
    readonly type = SAVE_TAG_SUCCESS;
    constructor(public payload: Tag) {}
}

export class SaveTopicTypeSuccess implements Action {
    readonly type = SAVE_TOPIC_TYPE_SUCCESS;
    constructor(public payload: TopicType) {}
}

export class AddCategorySuccess implements Action {
    readonly type = ADD_CATEGORY_SUCCESS;
    constructor(public payload: Category) {}
}

export class AddTagSuccess implements Action {
    readonly type = ADD_TAG_SUCCESS;
    constructor(public payload: Tag) {}
}

export class AddTopicTypeSuccess implements Action {
    readonly type = ADD_TOPIC_TYPE_SUCCESS;
    constructor(public payload: TopicType) {}
}

export class DeleteCategorySuccess implements Action {
    readonly type = DELETE_CATEGORY_SUCCESS;
    // Payload - category id
    constructor(public payload: number) {}
}

export class DeleteTagSuccess implements Action {
    readonly type = DELETE_TAG_SUCCESS;
    // Payload - tag id
    constructor(public payload: number) {}
}

export class DeleteTopicTypeSuccess implements Action {
    readonly type = DELETE_TOPIC_TYPE_SUCCESS;
    // Payload - topic type id
    constructor(public payload: number) {}
}

export class SaveFail implements Action {
    readonly type = SAVE_FAIL;
}

export type Actions = LoadAll
| LoadAllSuccess
| LoadAllFail
| SwitchChannel
| LoadCategories
| LoadTags
| SearchTopics
| LoadTopics
| LoadCategoriesSuccess
| LoadTagsSuccess
| SearchTopicsSuccess
| SearchTopicsFail
| LoadAttrFail
| AddGeoLocation
| AddGeoLocationSuccess
| SaveGeoLocation
| SaveGeoLocationSuccess
| DeleteGeoLocation
| DeleteCategorySuccess
| AddTag
| AddCategory
| AddTopicType
| SaveTag
| SaveCategory
| SaveTopicType
| DeleteTag
| DeleteCategory
| DeleteTopicType
| SaveCategorySuccess
| SaveTagSuccess
| SaveTopicTypeSuccess
| AddCategorySuccess
| AddTagSuccess
| AddTopicTypeSuccess
| DeleteCategorySuccess
| DeleteTagSuccess
| DeleteTopicTypeSuccess
| SaveFail;
