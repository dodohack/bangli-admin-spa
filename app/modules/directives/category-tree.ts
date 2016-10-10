import { Component, EventEmitter } from '@angular/core';
import { Input, Output }           from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { Category }                from '../../models';
import { Channel }                 from '../../models';
import { getCatChild }             from '../../helper';

@Component({
    selector: 'category-tree',
    template: require('./category-tree.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryTree {
    // Parent category id of current level of tree
    @Input() parentId: number;
    // Current channel id
    @Input() channelId: number;
    @Input() selectedCats: Category[] = [];
    @Input() categories: Category[];

    @Output() checkEvent = new EventEmitter();

    /**
     * Return categories of selected channel if channelId is given
     */
    get catsOfChannel(): Category[] {
        if (!this.categories) return [];

        let tmpCats = this.categories;

        if (this.channelId)
            tmpCats = tmpCats.filter(c => c.channel_id === this.channelId);

        // Apply selected categories
        return tmpCats.map(cat => {
            return Object.assign({}, cat,
                {checked: this.selectedCats.map(c => c.id)
                    .indexOf(cat.id) !== -1});
        });
    }
    

    hasChild(cat: Category) {
        return getCatChild(cat).length > 0;
    }
}
