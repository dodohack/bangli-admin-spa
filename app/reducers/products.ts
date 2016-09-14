/**
 * Shop product reducer 
 */
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action }     from '@ngrx/store';

import { Paginator }      from '../models';
import { Product }        from '../models';
import { ProductActions } from '../actions';

export interface ProductsState {
    ids: number[];
    editing: number[]; // Product in editing state
    entities: { [id: number]: Product };
    paginator: Paginator;
};

const initialState: ProductsState = {
    ids: [],
    editing: [],
    entities: {},
    paginator: new Paginator
};

export default function (state = initialState, action: Action): ProductsState {
    switch (action.type)
    {
        case ProductActions.SEARCH_COMPLETE:
        case ProductActions.LOAD_PRODUCTS_SUCCESS: {
            const products: Product[] = action.payload.products;
            const ids: number[]       = products.map(p => p.id);
            const entities            = products.reduce(
                (entities: { [id: number]: Product }, product: Product) => {
                    return Object.assign(entities, { [product.id]: product });
                }, {});

            return {
                ids: [...ids],
                editing: [],
                entities: Object.assign({}, entities),
                paginator: Object.assign({}, action.payload.paginator)
            };
        }

        case ProductActions.BATCH_EDIT_PRODUCTS: {
            return {
                ids: [...state.ids],
                editing: [...action.payload],
                entities: Object.assign({}, state.entities),
                paginator: Object.assign({}, state.paginator)
            };
        }

        case ProductActions.CANCEL_BATCH_EDIT_PRODUCTS: {
            return {
                ids: [...state.ids],
                editing: [],
                entities: Object.assign({}, state.entities),
                paginator: Object.assign({}, state.paginator)
            };
        }

        case ProductActions.BATCH_EDIT_PREVIOUS_PRODUCT: {
            // DO NOTHING IF WE ARE NOT FAST EDITING SINGLE PRODUCT
            if (state.editing.length !== 1) return state;

            // Get previous product id
            let idx = state.ids.indexOf(state.editing[0]) - 1;
            if (idx < 0) idx = 0;
            const previousId = state.ids[idx];

            return {
                ids: [...state.ids],
                editing: [previousId],
                entities: Object.assign({}, state.entities),
                paginator: Object.assign({}, state.paginator)
            };
        }

        case ProductActions.BATCH_EDIT_NEXT_PRODUCT: {
            // DO NOTHING IF WE ARE NOT FAST EDITING SINGLE PRODUCT
            if (state.editing.length !== 1) return state;

            // Get next product id
            let idx = state.ids.indexOf(state.editing[0]) + 1;
            if (idx > state.ids.length - 1) idx = state.ids.length - 1;
            const nextId = state.ids[idx];

            return {
                ids: [...state.ids],
                editing: [nextId],
                entities: Object.assign({}, state.entities),
                paginator: Object.assign({}, state.paginator)
            };
        }

        case ProductActions.SAVE_PRODUCT_SUCCESS:
        case ProductActions.LOAD_PRODUCT_SUCCESS: {
            console.log("Load product success");
            // Product id
            const id: number = +action.payload['id'];

            // Update corresponding product from current products list or create a
            // new list with 1 element.
            // TODO: Remove id 0 product
            return {
                ids: (state.ids.indexOf(id) === -1) ? [...state.ids, id] : [...state.ids],
                editing: [id],
                entities: Object.assign({}, state.entities, {[id]: action.payload}),
                paginator: Object.assign({}, state.paginator)
            };
        }

        case ProductActions.NEW_PRODUCT: {
            // Create a new product, we use '0' as a placeholder id
            const id = 0;
            let newProduct: Product  = new Product;
            newProduct.state      = 'unsaved';
            newProduct.categories = [];
            newProduct.tags       = [];
            newProduct.topics     = [];
            return {
                ids: [...state.ids, id],
                editing: [id],
                entities: Object.assign({}, state.entities, {[id]: newProduct}),
                paginator: Object.assign({}, state.paginator)
            };
        }


        // Add a tag/topic/category to single/multiple product[s]
        case ProductActions.ADD_TAG:
        case ProductActions.ADD_TOPIC:
        case ProductActions.ADD_CATEGORY: {
            let key = 'categories';
            if (action.type == ProductActions.ADD_TAG) key = 'tags';
            if (action.type == ProductActions.ADD_TOPIC) key = 'topics';

            const newProductArray = state.editing.map(id => {
                const oldProduct  = state.entities[id];
                const isDup = oldProduct[key]
                    .filter(item => item.id === action.payload.id);
                if (isDup && isDup.length) {
                    // Use old product in next state as nothing changes
                    return oldProduct;
                } else {
                    // Create a new product
                    const newItems = [...oldProduct[key], action.payload];
                    return Object.assign({}, oldProduct, {[key]: newItems});
                }
            });

            let newProducts: { [id: number]: Product } = {};
            newProductArray.forEach(product => newProducts[product.id] = product);

            return {
                ids: [...state.ids],
                editing: [...state.editing],
                entities: Object.assign({}, state.entities, newProducts),
                paginator: Object.assign({}, state.paginator)
            };
        }

        // Remove a tag/topic/category from single/multiple product[s]
        case ProductActions.REMOVE_TAG:
        case ProductActions.REMOVE_TOPIC:
        case ProductActions.REMOVE_CATEGORY: {
            let key = 'categories';
            if (action.type == ProductActions.REMOVE_TAG) key = 'tags';
            if (action.type == ProductActions.REMOVE_TOPIC) key = 'topics';

            const newProductArray = state.editing.map(id => {
                const oldProduct = state.entities[id];
                const leftItems = oldProduct[key]
                    .filter(item => item.id !== action.payload);
                // Always return a new object
                return Object.assign({}, oldProduct, {[key]: leftItems});
            });

            let newProducts: { [id: number]: Product } = {};
            newProductArray.forEach(product => newProducts[product.id] = product);

            return {
                ids: [...state.ids],
                editing: [...state.editing],
                entities: Object.assign({}, state.entities, newProducts),
                paginator: Object.assign({}, state.paginator)
            };
        }

        case ProductActions.APPLY_REVISION: {
            const productid = action.payload[0];
            const revid = action.payload[1];
            // Get revision.body
            const newBody = state.entities[productid].revisions
                .filter(r => r.id === revid).map(r => r.body);
            // Apply revision.body to product.content
            const newProduct = Object.assign({}, state.entities[productid],
                { content: newBody });
            return {
                ids: [...state.ids],
                editing: [...state.editing],
                entities: Object.assign({}, state.entities, {[productid]: newProduct}),
                paginator: Object.assign({}, state.paginator)
            }
        }

        case ProductActions.REFRESH_ACTIVITY_STATUS: {
            let newProducts: { [id: number]: Product } = {};
            if (action.payload === null) {
                state.ids.forEach(id =>
                    newProducts[id] = Object.assign({},
                        state.entities[id], {activities: []}));
            } else {
                state.ids.forEach(id => {
                    const activities = action.payload.filter(a => a.content_id === id);
                    newProducts[id] = Object.assign({},
                        state.entities[id], {activities: activities})
                });
            }
            return {
                ids: [...state.ids],
                editing: [...state.editing],
                entities: Object.assign({}, state.entities, newProducts),
                paginator: Object.assign({}, state.paginator)
            };
        }

        /* This is a must, as we can get the updated product from its subscriber */
        /*
         case ProductActions.SAVE_PRODUCT: {
         const id: number = +action.payload['id'];

         return {
         ids: [...state.ids],
         editing: [...state.editing],
         entities: Object.assign({}, state.entities, {[id]: action.payload}),
         paginator: Object.assign({}, state.paginator)
         };
         }
         */

        default:
            return state;
    }
}

/**
 * Return a product from current product list by id
 */
export function getProduct(id: number) {
    return (state$: Observable<ProductsState>) =>
        state$.select(s => s.entities[id]);
}