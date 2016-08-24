import { Action }  from '@ngrx/store';
import { Page } from '../models';

export class PageActions {
    static SEARCH = '[Page] Search';
    static search(query:string):Action {
        return {
            type: PageActions.SEARCH,
            payload: query
        };
    }

    static SEARCH_COMPLETE = '[Page] Search Complete';
    static searchComplete(results:Page[]):Action {
        return {
            type: PageActions.SEARCH_COMPLETE,
            payload: results
        };
    }

    static LOAD_PAGES = '[Page] Load Pages';
    static loadPages(filters:any):Action {
        return {
            type: PageActions.LOAD_PAGES,
            payload: filters
        };
    }

    static LOAD_PAGES_SUCCESS = '[Page] Load Pages Success';
    static loadPagesSuccess(pages:Page[]):Action {
        return {
            type: PageActions.LOAD_PAGES_SUCCESS,
            payload: pages
        };
    }

    static LOAD_PAGES_FAIL = '[Page] Load Pages Fail';
    static loadPagesFail():Action {
        return {
            type: PageActions.LOAD_PAGES_FAIL,
        };
    }

    static LOAD_PAGE = '[Page] Load Page';
    static loadPage(id:string):Action {
        return {
            type: PageActions.LOAD_PAGE,
            payload: id
        };
    }

    static LOAD_PAGE_SUCCESS = '[Page] Load Page Success';
    static loadPageSuccess(page:Page):Action {
        return {
            type: PageActions.LOAD_PAGE_SUCCESS,
            payload: page
        };
    }

    static LOAD_PAGE_FAIL = '[Page] Load Page Fail';
    static loadPageFail():Action {
        return {
            type: PageActions.LOAD_PAGE_FAIL,
        };
    }

    static AUTO_SAVE = '[Page] Auto Save';
    static autoSave(page:Page):Action {
        return {
            type: PageActions.AUTO_SAVE,
            payload: page
        };
    }

    static SAVE_PAGE = '[Page] Save Page';
    static savePage(page:Page):Action {
        return {
            type: PageActions.SAVE_PAGE,
            payload: page
        };
    }

    static SAVE_PAGES = '[Page] Save Pages';
    static savePages(pages:Page[]):Action {
        return {
            type: PageActions.SAVE_PAGES,
            payload: pages
        };
    }
}