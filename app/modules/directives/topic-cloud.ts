import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Topic } from '../../models';

@Component({
    selector: 'topic-cloud',
    template: require('./topic-cloud.html')
})
export class TopicCloud {
    @Input()
    topics: Topic[];

    @Output()
    checkEvent = new EventEmitter();

    filterTopic(str: string)
    {
        /*
        for (let i in this.topics)
        {
            // Set initial state
            this.topics[i].hidden = true;

            if (this.topics[i].title.includes(str) ||
                this.topics[i].guid.includes(str))
                this.topics[i].hidden = false;
        }
        */
    }
}