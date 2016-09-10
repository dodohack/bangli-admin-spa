/**
 * Tables of list orders
 */
import { Component }     from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter }  from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { EntityList } from '../../base/entity.list';

import { OrdersState } from '../../../reducers/orders';

@Component({
    selector: 'order-list',
    template: require('./order.list.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderList extends EntityList
{
}
