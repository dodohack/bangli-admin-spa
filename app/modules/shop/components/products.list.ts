/**
 * Tables of list products
 */
import { Component }     from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter }  from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { ProductsState } from '../../reducers/products';

@Component({
    selector: 'products-list',
    template: require('./products.list.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsList
{
    _productsState: ProductsState;
    @Input() set productsState(value) { this._productsState = Object.assign({}, value); }
    get productsState() { return this._productsState; }
    
    @Output() quickEdit = new EventEmitter();

    get ids() { return this._productsState.ids; }
    get products() { return this._productsState.entities; }
    get paginator() { return this._productsState.paginator; }
}
