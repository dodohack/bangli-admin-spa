import { Component, EventEmitter } from '@angular/core';
import { Input, Output }           from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { Category }                from '../../models';
import { Channel }                 from '../../models';

@Component({
    selector: 'category-tree',
    template: require('./category-tree.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryTree {
    // Parent category id of current level of tree
    @Input() parentId: number;
    // Channel of current group of category
    @Input() channel: Channel;
    @Input() selectedCats: Category[];
    @Input() categories: Category[];

    @Output() checkEvent = new EventEmitter();

    get updatedCats(): Category[] {
        let selectedIds: number[] = [];
        if (this.selectedCats) selectedIds = this.selectedCats.map(c => c.id);

        let tmpCats: Category[];
        if (this.channel)
            tmpCats = this.categories.filter(c => c.channel_id === this.channel.id);
        else
            tmpCats = this.categories;

        return tmpCats.map(c => {
            let checked = selectedIds.indexOf(c.id) !== -1;
            return Object.assign({}, c, {checked: checked});
        });
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
        return this.getChild(cat).length;
    }
}
