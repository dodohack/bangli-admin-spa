/**
 * Tables of list products
 */
import { Component }     from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter }  from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { Product } from '../../models';

@Component({
    selector: 'products-list',
    template: require('./products-list.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsList
{
    _products: Product[];
    @Input() set products(value) { this._products = Object.assign({}, value); }
    get products() { return this._products; }
    
    @Output() quickEdit = new EventEmitter();
}
