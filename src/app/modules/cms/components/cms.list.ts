/**
 * Display a table list of posts/topics/pages
 */
import { Component }     from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter }  from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { EntityList }    from '../../base/entity.list';

import { zh_CN } from '../../../localization';

@Component({
    selector: 'cms-list',
    templateUrl: './cms.list.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CmsList extends EntityList
{
    get zh() { return zh_CN.cms; }
}
