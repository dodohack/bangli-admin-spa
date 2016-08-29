import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Topic } from '../../models';

@Component({
    selector: 'topic-cloud',
    template: require('./topic-cloud.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopicCloud {
    
    @Input() 
    selectedTopics: Topic[];
    
    @Input()
    topics: Topic[];

    @Output() addTopic    = new EventEmitter();
    @Output() removeTopic = new EventEmitter();
    
    get availableTopics()
    {
        let selectedIds = this.selectedTopics.map(t => t.id);
        return this.topics.filter(t => {
            let idx = selectedIds.indexOf(t.id);
            return (idx === -1) ? true : false;
        });
    }

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