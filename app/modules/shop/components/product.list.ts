/**
 * Tables of list products
 */
import { Component }     from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter }  from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { EntityList }     from '../../base/entity.list';

import { zh_CN } from '../../../localization';

@Component({
    selector: 'product-list',
    template: require('./product.list.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductList extends EntityList
{
    get zh() { return zh_CN.product; }
}
