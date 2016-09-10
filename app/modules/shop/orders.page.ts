/**
 * This is the component for orders list, single order editing.
 */

import { Component }         from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import { AppState }          from '../../reducers';
import { AuthState }         from '../../reducers/auth';
import { OrdersState }       from '../../reducers/orders';
import { OrderActions }      from '../../actions';
import { ShopAttrsState }    from '../../reducers/shopattrs';

import { CARRIERS }           from '../../models';
import { Order, OrderParams } from '../../models';

import { zh_CN } from '../../localization';

@Component({ template: require('./orders.page.html') })
export class OrdersPage implements OnInit, OnDestroy
{
    // All subscribers, needs to unsubscribe on destroy
    subAuth: any;
    subShop: any;
    subOrders: any;
    subParams: any;
    subQueryParams: any;

    /* Order index and order, the order we are current editing */
    index: number;
    order: Order;

    authState:     AuthState;
    shopState:     ShopAttrsState;
    ordersState:   OrdersState;

    // Batch editing orders
    ordersInEdit: Order[];

    params: any;
    queryParams: any;

    // Is search is running
    loading: boolean;

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) {}


    ngOnInit() {
        this.subAuth = this.store.select<AuthState>('auth')
            .subscribe(authState => this.authState = authState);
        this.subAuth = this.store.select<ShopAttrsState>('shop')
            .subscribe(shopState => this.shopState = shopState);
        this.subOrders = this.store.select<OrdersState>('orders')
            .subscribe(ordersState => {
                // Set search loading to false if orders is loaded
                this.loading = false;
                this.ordersState = ordersState;
                // Create new copies of orders
                this.ordersInEdit = this.ordersState.editing
                    .map(id => Object.assign({}, this.ordersState.entities[id]));
            });

        // THIS IS A TEMPORARY FIX
        // FIXME: Previous request is cancel by the second one if exists
        // FIXME: and potential other kind of issues
        // Load orders when any url parameter changes
        this.subParams = this.route.params.subscribe(params => {
            this.params = params;
            this.loading = true;
            this.loadOrders();
        });
        this.subQueryParams = this.route.queryParams.subscribe(params => {
            this.queryParams = params;
            this.loading = true;
            this.loadOrders();
        });        
    }
    
    ngOnDestroy() {
        this.subAuth.unsubscribe();
        this.subOrders.unsubscribe();
        this.subParams.unsubscribe();
        this.subQueryParams.unsubscribe();        
    }

    get zh() { return zh_CN.order; }
    get availableCarriers() { return CARRIERS; }
    
    loadOrders() {
        let orderParams: OrderParams = new OrderParams;

        // Must have parameters come from route.params observable
        if (this.params) {
            orderParams.cur_page = this.params['page'];
            orderParams.state    = this.params['state'];
        }

        // Optional parameters come from route.queryParams observable
        if (this.queryParams) {
            orderParams.datetype = this.queryParams['datetype'];
            orderParams.datefrom = this.queryParams['datefrom'];
            orderParams.dateto   = this.queryParams['dateto'];
            orderParams.query    = this.queryParams['query'];
        }

        // Load list of orders from API server
        this.store.dispatch(OrderActions.loadOrders(orderParams));
    }



    /**
     * Get amount of products in given order
     * @param order
     */
    private orderItemCount(order)
    {
        //let json = JSON.parse(order['products']);
        let json = order['products'];
        
        let length = json.length;
        let count  = 0;
        for (let i = 0; i < length; i++)
        {
            count += +json[i].qty;
        }

        return count;
    }

    /**
     * Get tracking number of given order
     * @param order
     */
    private orderTracking(order: Order)
    {
        //let json = JSON.parse(order['shippings']);
        let json = order['shippings'];

        let length = json.length;
        let tracking = '';
        for (let i = 0; i < length; i++)
        {
            if (json[i].tracking)
                tracking += json[i].tracking + ',';
        }

        return tracking;
    }
    
}