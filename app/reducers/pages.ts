/**
 * Cms page reducer
 */
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action }     from '@ngrx/store';

import { Paginator }      from '../models';
import { Page }        from '../models';
import { PageActions } from '../actions';

export interface PagesState {
    ids: number[];
    entities: { [id: number]: Page };
    paginator: Paginator;
};

const initialState: PagesState = {
    ids: [],
    entities: {},
    paginator: new Paginator
};

export default function (state = initialState, action: Action): PagesState {
    switch (action.type)
    {
        case PageActions.SEARCH_COMPLETE:
        case PageActions.LOAD_PAGES_SUCCESS: {
            const pages: Page[] = action.payload.pages;
            const ids: number[]       = pages.map(p => p.id);
            const entities            = pages.reduce(
                (entities: { [id: number]: Page }, page: Page) => {
                    page.selected = false;
                    return Object.assign(entities, { [page.id]: page });
                }, {});

            return {
                ids: [...ids],
                entities: Object.assign({}, entities),
                paginator: Object.assign({}, action.payload.paginator)
            };
        }

        case PageActions.LOAD_PAGE_SUCCESS: {
            // Page id
            const id: number = +action.payload['id'];

            // Update corresponding page from current pages list with
            // detailed information.
            if (state.ids.indexOf(id) !== -1) {
                return {
                    ids: [...state.ids],
                    // FIXME: 'selected' state is lost
                    entities: Object.assign({}, state.entities, {[id]: action.payload}),
                    paginator: Object.assign({}, state.paginator)
                };
            } else {
                return {
                    ids: [id],
                    entities: Object.assign({}, {[id]: action.payload}),
                    // paginator should be empty
                    paginator: Object.assign({}, state.paginator)
                };
            }
        }

        default:
            return state;
    }
}

/**
 * Return a page from current page list by id
 */
export function getPage(id: number) {
    return (state$: Observable<PagesState>) =>
        state$.select(s => s.entities[id]);
}
