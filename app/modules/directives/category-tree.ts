import { Component, EventEmitter } from '@angular/core';
import { Input, Output }           from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { Category }                from '../../models';

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
    @Input() selectedCats: Category[];
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

        if (this.selectedCats)  // Apply selected categories
            return tmpCats.map(cat => Object.assign({}, cat,
                {checked: this.selectedCats.map(c => c.id).indexOf(cat.id) !== -1}));
        else   // Return categories with 'checked' state unset
            return tmpCats.map(cat => Object.assign({}, cat, {checked: false}));
    }

    /**
     * This function return direct children and all lower level childrens
     */
    getChild(cat: Category) {
        // Get direct children
        let children = this.categories.filter(v => v.parent_id === cat.id);

        // Get children of direct children recursively
        let childrenOfChild = [];
        if (children) {
            for (let i = 0; i < children.length; i++) {
                let cc = this.getChild(children[i]);
                childrenOfChild = [...childrenOfChild, ...cc];
            }
            children = [...children, ...childrenOfChild];
        }

        return children;
}

    hasChild(cat: Category) {
        return this.getChild(cat).length > 0;
    }
}
