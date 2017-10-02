import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Tag } from '../../models';

@Component({
    selector: 'tag-cloud',
    template: require('./tag-cloud.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagCloud implements OnInit {
    
    filterControl = new FormControl();
    filterText: string = '';
    filteredTags: Tag[] = [];
    
    @Input() selectedTags: Tag[];
    @Input() tags: Tag[];

    @Output() addTag    = new EventEmitter();
    @Output() removeTag = new EventEmitter();
    
    constructor(private cd: ChangeDetectorRef) {}


    ngOnInit() {
        this.filterControl.valueChanges
            .debounceTime(100).subscribe(text => {
            this.filterText = text;
            this.filteredTags = this.unselectedTags.filter(t =>
                (t.slug.includes(text) || t.name.includes(text)) ? true : false);
            this.cd.markForCheck();
        });
    }

    get unselectedTags(): Tag[] {
        let selectedIds: number[] = [];
        if (this.selectedTags) selectedIds = this.selectedTags.map(t => t.id);
        return this.tags.filter(t =>
            (selectedIds.indexOf(t.id) === -1) ? true : false);
    }

    /**
     * Get filteredTags if there is filter text, otherwise return
     * default unselectedTags.
     * @returns {Tag[]}
     */
    get availableTags(): Tag[] {
        return this.filterText === '' ?  this.unselectedTags : this.filteredTags;
    }    
}
