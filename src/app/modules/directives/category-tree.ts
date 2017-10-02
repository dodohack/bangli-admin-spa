import { Component, EventEmitter } from '@angular/core';
import { Input, Output }           from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { Category }                from '../../models';

@Component({
    selector: 'category-tree',
    templateUrl: './category-tree.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryTree {
    // Parent category id of current level of tree
    @Input() parentId: number;
    @Input() selectedCats: Category[]; // Categories of entity owns
    @Input() categories: Category[];   // Categories of given channel

    @Output() checkEvent = new EventEmitter();

    get hasCategory() { return this.categories && this.categories.length; }

    /**
     * Apply entity's selectedCats to categories
     */
    get updatedCats(): Category[] {
        if (!this.categories) return [];

        if (this.selectedCats)  // Apply selected categories
            return this.categories.map(cat => Object.assign({}, cat,
                {checked: this.selectedCats.map(c => c.id).indexOf(cat.id) !== -1}));
        else   // Return categories with 'checked' state unset
            return this.categories.map(cat => Object.assign({}, cat, {checked: false}));
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
