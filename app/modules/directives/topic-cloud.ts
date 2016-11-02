import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { TopicType } from '../../models';
import { Topic }     from '../../models';

@Component({
    selector: 'topic-cloud',
    template: require('./topic-cloud.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopicCloud implements OnInit {
    
    searchControl = new FormControl();

    @Input() topicTypes: TopicType[];  // Topic types of given channel
    @Input() selectedTopics: Topic[]; // Topics owned by current entity
    @Input() topics: Topic[];         // Searched topic candidates

    @Output() searchTopic = new EventEmitter();
    @Output() attachTopic = new EventEmitter();
    @Output() detachTopic = new EventEmitter();

    ngOnInit() {
        // Emit an event to search a limited topics
        this.searchControl.valueChanges.debounceTime(300)
            .distinctUntilChanged()
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

    isOpen(ttype) {
        if ((this.topics && this.topicsOfTType(ttype).length > 0) ||
            (this.selectedTopics && this.selectedTopicsOfTType(ttype).length > 0))
            return true;
        return false;
    }
}
