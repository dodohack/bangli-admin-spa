/**
 * Tables of list orders
 */
import { Component }     from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter }  from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { OrdersState } from '../../reducers/orders';

@Component({
    selector: 'orders-list',
    template: require('./orders.list.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersList
{
    _ordersState: OrdersState;
    @Input() set ordersState(value) { this._ordersState = Object.assign({}, value); }
    get ordersState() { return this._ordersState; }

    @Output() quickEdit = new EventEmitter();

    get ids() { return this._ordersState.ids; }
    get orders() { return this._ordersState.entities; }
    get paginator() { return this._ordersState.paginator; }
}
