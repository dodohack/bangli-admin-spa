/**
 * Display a table list of posts
 */
import { Component }     from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter }  from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { TopicsState } from '../../reducers/topics';

@Component({
    selector: 'topics-list',
    template: require('./topics.list.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopicsList
{
    _topicsState: TopicsState;
    @Input() set topicsState(value) { this._topicsState = Object.assign({}, value); }
    get topicsState() { return this._topicsState; }

    get ids() { return this._topicsState.ids; }
    get topics() { return this._topicsState.entities; }
    get paginator() { return this._topicsState.paginator; }
}
