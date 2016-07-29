import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Topic } from '../models';

@Component({
    selector: 'topic-cloud',
    template:
        `
    <div class="filter-wrapper">
         <input placeholder="过滤" type="text" class="form-control" 
         #box (keyup)="filterTopic(box.value)">
    </div>
    <ul class="topic-cloud">
        <template ngFor let-topic [ngForOf]="topics">
        <li *ngIf="!topic.hidden" class="topic-item label label-pill label-success"
            [class.active]="topic.checked"
            (click)="check(topic)" >
            {{ topic.title }}
        </li>
        </template>
    </ul>
    `
})
export class TopicCloudComponent {
    @Input()
    topics: Topic[];

    @Output()
    checkEvent = new EventEmitter();

    check(topic) {
        topic.checked = !topic.checked;
        /* Notify parent */
        this.checkEvent.emit(topic);
    }

    filterTopic(str: string)
    {
        for (let i in this.topics)
        {
            /* Set initial state */
            this.topics[i].hidden = true;

            if (this.topics[i].title.includes(str) ||
                this.topics[i].guid.includes(str))
                this.topics[i].hidden = false;
        }
    }
}