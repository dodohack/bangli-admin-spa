/**
 * Action to get CMS attributes, includes:
 * authors, editors, categories, tags, topic_cats, state, channels etc
 */
import { Action }          from '@ngrx/store';
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

    static SAVE_SUCCESS = '[CmsAttr] Save Success';
    static saveSuccess(): Action {
        return {
            type: CmsAttrActions.SAVE_SUCCESS
        }
    }

    static SAVE_FAIL = '[CmsAttr] Save Fail';
    static saveFail(): Action {
        return {
            type: CmsAttrActions.SAVE_FAIL
        }
    }
    
}
