import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Channel } from '../../models';
import { Topic }   from '../../models';

@Component({
    selector: 'topic-cloud',
    template: require('./topic-cloud.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopicCloud implements OnInit {
    
    filterControl = new FormControl();
    filterText: string = '';
    filteredTopics: Topic[] = [];

    @Input() channel: Channel;
    @Input() selectedTopics: Topic[];
    @Input() topics: Topic[];

    @Output() addTopic    = new EventEmitter();
    @Output() removeTopic = new EventEmitter();

    constructor(private cd: ChangeDetectorRef) {}
    
    ngOnInit() {
        this.filterControl.valueChanges
            .debounceTime(100).subscribe(text => {
            this.filterText = text;
            this.filteredTopics = this.unselectedTopics.filter(t =>
                (t.guid.includes(text) || t.title.includes(text)) ? true : false);
            this.cd.markForCheck();
        });
    }

    get unselectedTopics() {
        let selectedIds: number[] = [];
        if (this.selectedTopics) selectedIds = this.selectedTopics.map(t => t.id);
        return this.topics.filter(t =>
            (this.channel && t.channel_id === this.channel.id) ?
                ((selectedIds.indexOf(t.id) === -1) ? true : false) : false);
    }

    /**
     * Get filteredTopics if there is filter text, otherwise return
     * default unselectedTopics.
     * @returns {Topic[]}
     */
    get availableTopics() {
        return this.filterText === '' ?  this.unselectedTopics : this.filteredTopics;
    }
}