/**
 * Display and edit deal topic extra content
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChangeDetectionStrategy }                from "@angular/core";

import { Entity }  from '../../models';

@Component({
    selector: 'deal-topic-content',
    templateUrl: './deal-topic-content.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DealTopicContent {
}
