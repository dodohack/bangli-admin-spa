/**
 * Display a table list of advertisements
 */
import { Component }     from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter }  from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { EntityList }    from '../../base/entity.list';
import { Helper }        from "../../../helper";
import { zh_CN }         from "../../../localization/zh_CN";

@Component({
    selector: 'ads-list',
    templateUrl: './ads.list.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdsList extends EntityList
{
    public constructor(helper: Helper) { super(helper); }

    get zh() { return zh_CN.cms; }
}
