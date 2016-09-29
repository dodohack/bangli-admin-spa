/**
 * Action to get CMS attributes, includes:
 * authors, editors, categories, tags, topic_cats, state, channels etc
 */
import { Action }          from '@ngrx/store';
import { GeoLocation }     from '../models';
import { Category }        from '../models';
import { Tag }             from '../models';
import { Topic }           from '../models';
import { AuthState }       from '../reducers/auth';
import { CmsAttrsState }   from '../reducers/cmsattrs';

export class CmsAttrActions {
    static LOAD_ALL = '[CmsAttr] Load All';
    static loadAll(auth: AuthState): Action {
        return {
            type: CmsAttrActions.LOAD_ALL,
            payload: auth
        };
    }

    static LOAD_ALL_SUCCESS = '[CmsAttr] Load All Success';
    static loadAllSuccess(attr: CmsAttrsState): Action {
        return {
            type: CmsAttrActions.LOAD_ALL_SUCCESS,
            payload: attr
        };
    }

    static LOAD_ALL_FAIL = '[CmsAttr] Load All Fail';
    static loadAllFail(): Action {
        return {
            type: CmsAttrActions.LOAD_ALL_FAIL
        };
    }

    static LOAD_CATEGORIES = '[CmsAttr] Load Categories';
    static loadCategories(auth: AuthState): Action {
        return {
            type: CmsAttrActions.LOAD_CATEGORIES,
            payload: auth
        };
    }

    static LOAD_TAGS = '[CmsAttr] Load Tags';
    static loadTags(auth: AuthState): Action {
        return {
            type: CmsAttrActions.LOAD_TAGS,
            payload: auth
        };
    }

    static LOAD_TOPICS = '[CmsAttr] Load Topics';
    static loadTopics(auth: AuthState): Action {
        return {
            type: CmsAttrActions.LOAD_TOPICS,
            payload: auth
        };
    }

    static LOAD_CATEGORIES_SUCCESS = '[CmsAttr] Load Categories Success';
    static loadCategoriesSuccess(cats: Category[]): Action {
        return {
            type: CmsAttrActions.LOAD_CATEGORIES_SUCCESS,
            payload: cats
        };
    }

    static LOAD_TAGS_SUCCESS = '[CmsAttr] Load Tags Success';
    static loadTagsSuccess(tags: Tag[]): Action {
        return {
            type: CmsAttrActions.LOAD_CATEGORIES_SUCCESS,
            payload: tags
        };
    }

    static LOAD_TOPICS_SUCCESS = '[CmsAttr] Load Topics Success';
    static loadTopicsSuccess(topics: Topic[]): Action {
        return {
            type: CmsAttrActions.LOAD_CATEGORIES_SUCCESS,
            payload: topics
        };
    }

    static LOAD_ATTR_FAIL = '[CmsAttr] Load Attr Fail';
    static loadAttrFail(): Action {
        return {
            type: CmsAttrActions.LOAD_ATTR_FAIL
        };
    }

    static ADD_GEO_LOCATION = '[CmsAttr] Add Geo Location';
    static addGeoLocation(loc: GeoLocation): Action {
        return {
            type: CmsAttrActions.ADD_GEO_LOCATION,
            payload: loc
        }
    }

    static ADD_GEO_LOCATION_SUCCESS = '[CmsAttr] Add Geo Location Success';
    static addGeoLocationSuccess(loc: GeoLocation): Action {
        return {
            type: CmsAttrActions.ADD_GEO_LOCATION_SUCCESS,
            payload: loc
        }
    }

    static SAVE_GEO_LOCATION = '[CmsAttr] Edit Geo Location';
    static saveGeoLocation(loc: GeoLocation): Action {
        return {
            type: CmsAttrActions.SAVE_GEO_LOCATION,
            payload: loc
        }
    }

    static SAVE_GEO_LOCATION_SUCCESS = '[CmsAttr] Save Geo Location Success';
    static saveGeoLocationSuccess(loc: GeoLocation): Action {
        return {
            type: CmsAttrActions.SAVE_GEO_LOCATION_SUCCESS,
            payload: loc
        }
    }

    static DELETE_GEO_LOCATION = '[CmsAttr] Delete Geo Location';
    static deleteGeoLocation(loc: GeoLocation): Action {
        return {
            type: CmsAttrActions.DELETE_GEO_LOCATION,
            payload: loc
        }
    }

    static DELETE_GEO_LOCATION_SUCCESS = '[CmsAttr] Delete Geo Location Success';
    static deleteGeoLocationSuccess(locId: number): Action {
        return {
            type: CmsAttrActions.DELETE_GEO_LOCATION_SUCCESS,
            payload: locId
        }
    }

    static ADD_TAG = '[CmsAttr] Add Tag';
    static addTag(tag: Tag): Action {
        return {
            type: CmsAttrActions.ADD_TAG,
            payload: tag
        }
    }

    static ADD_CATEGORY = '[CmsAttr] Add Category';
    static addCategory(cat: Category): Action {
        return {
            type: CmsAttrActions.ADD_CATEGORY,
            payload: cat
        }
    }
    
    static SAVE_TAG = '[CmsAttr] Save Tag';
    static saveTag(tag: Tag): Action {
        return {
            type: CmsAttrActions.SAVE_TAG,
            payload: tag
        }
    }

    static SAVE_CATEGORY = '[CmsAttr] Save Category';
    static saveCategory(cat: Category): Action {
        return {
            type: CmsAttrActions.SAVE_CATEGORY,
            payload: cat
        }
    }
    
    static DELETE_TAG = '[CmsAttr] Delete Tag';
    static deleteTag(tag: Tag): Action {
        return {
            type: CmsAttrActions.DELETE_TAG,
            payload: tag
        }
    }

    static DELETE_CATEGORY = '[CmsAttr] Delete Category';
    static deleteCategory(cat: Category): Action {
        return {
            type: CmsAttrActions.DELETE_CATEGORY,
            payload: cat
        }
    }

    static SAVE_CATEGORY_SUCCESS = '[CmsAttr] Save Category Success';
    static saveCategorySuccess(cat: Category): Action {
        return {
            type: CmsAttrActions.SAVE_CATEGORY_SUCCESS,
            payload: cat
        }
    }

    static SAVE_TAG_SUCCESS = '[CmsAttr] Save Tag Success';
    static saveTagSuccess(tag: Tag): Action {
        return {
            type: CmsAttrActions.SAVE_TAG_SUCCESS,
            payload: tag
        }
    }

    static ADD_CATEGORY_SUCCESS = '[CmsAttr] Add Category Success';
    static addCategorySuccess(cat: Category): Action {
        return {
            type: CmsAttrActions.ADD_CATEGORY_SUCCESS,
            payload: cat
        }
    }

    static ADD_TAG_SUCCESS = '[CmsAttr] Add Tag Success';
    static addTagSuccess(tag: Tag): Action {
        return {
            type: CmsAttrActions.ADD_TAG_SUCCESS,
            payload: tag
        }
    }

    static DELETE_CATEGORY_SUCCESS = '[CmsAttr] Delete Category Success';
    static deleteCategorySuccess(catId: number): Action {
        return {
            type: CmsAttrActions.DELETE_CATEGORY_SUCCESS,
            payload: catId
        }
    }

    static DELETE_TAG_SUCCESS = '[CmsAttr] Delete Tag Success';
    static deleteTagSuccess(tagId: number): Action {
        return {
            type: CmsAttrActions.DELETE_TAG_SUCCESS,
            payload: tagId
        }
    }

    static SAVE_FAIL = '[CmsAttr] Save Fail';
    static saveFail(): Action {
        return {
            type: CmsAttrActions.SAVE_FAIL
        }
    }
    
}
