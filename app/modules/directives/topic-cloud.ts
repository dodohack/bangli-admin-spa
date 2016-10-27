import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { TopicType } from '../../models';
import { Entity }    from '../../models';

@Component({
    selector: 'topic-cloud',
    template: require('./topic-cloud.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopicCloud implements OnInit {
    
    searchControl = new FormControl();

    @Input() topicTypes: TopicType[];  // Topic types of given channel
    @Input() selectedTopics: Entity[]; // Topics owned by current entity
    @Input() topics: Entity[];         // Searched topic candidates

    @Output() searchTopic = new EventEmitter();
    @Output() addTopic    = new EventEmitter();
    @Output() removeTopic = new EventEmitter();

    ngOnInit() {
        // Emit an event to search a limited topics
        this.searchControl.valueChanges.debounceTime(200)
            .subscribe(text => this.searchTopic.emit(text));
    }

    // Get topics of given topic type
    topicsOfTType(ttype: TopicType) {
        return this.topics.filter(t => t.type_id === ttype.id);
    }

    // Get selected topics of given topic type
    selectedTopicsOfTType(ttype: TopicType) {
        return this.selectedTopics.filter(t => t.type_id === ttype.id);
    }
}
