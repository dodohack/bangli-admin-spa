/**
 * Offer filters
 */
import { OfferFilter } from '../models';
import * as filter     from '../actions/offer.filter';

export interface OfferFiltersState {
    entities: OfferFilter[];
}

const initState: OfferFiltersState = {
    entities: []
};

export function offerFilterReducer(state = initState,
                                   action: filter.Actions): OfferFiltersState {
    switch(action.type)
    {
        case filter.LOAD_ALL_SUCCESS: {
            const entities = action.payload;
            return Object.assign({}, state, {entities: entities});
        }

        case filter.SAVE_SUCCESS:
        case filter.LOAD_SUCCESS: {
            const entity = action.payload;
            const oldEntities = state.entities;
            let newEntities: OfferFilter[] = [];

            if (oldEntities.length) {
                // Replace old entity with saved one
                for(let i = 0; i < oldEntities.length; i++) {
                    if (oldEntities[i].type === entity.type)
                        newEntities.push(entity);
                    else
                        newEntities.push(oldEntities[i]);
                }
                return Object.assign({}, state, {entities: newEntities});
            } else {
                // Just one entity loaded
                return Object.assign({}, state, {entities: [entity]});
            }
        }

        default:
            return state;
    }
}


export const getOfferFilters = (state: OfferFiltersState) => state.entities;