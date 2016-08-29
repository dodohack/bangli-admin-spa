import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChangeDetectionStrategy }                from '@angular/core';
import { Tag } from '../../models';

@Component({
    selector: 'tag-cloud',
    template: require('./tag-cloud.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagCloud {
    
    @Input() 
    selectedTags: Tag[];
    
    @Input()
    tags: Tag[];

    @Output() addTag    = new EventEmitter();
    @Output() removeTag = new EventEmitter();

    /**
     * Filter out selectedTags from tags to get availableTags
     */
    get availableTags()
    {
        let selectedIds = this.selectedTags.map(t => t.id);
        return this.tags.filter(tag => {
            let idx = selectedIds.indexOf(tag.id);
            return (idx === -1) ? true : false;
        });
    }
}
