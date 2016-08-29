import { Component, EventEmitter } from '@angular/core';
import { Input, Output }           from '@angular/core';
import { Category }                from '../../models';

@Component({
    selector: 'category-tree',
    template: require('./category-tree.html')
})
export class CategoryTree {
    /* Only show category filter on root level */
    @Input()
    isTreeRoot: boolean;

    @Input()
    categories: Category[];

    @Output()
    checkEvent = new EventEmitter();

    filterTree(str: string)
    {
        for (let i in this.categories)
        {
            // Set initial state
            this.categories[i].hidden = true;

            if (this.categories[i].name.includes(str) ||
                this.categories[i].slug.includes(str))
                this.categories[i].hidden = false;

            if (this.categories[i].children) {
                this.filterChildren(this.categories[i], str)
            }
        }
    }

    filterChildren(cat: Category, str: string)
    {
        let isChildShown = false;
        for (let i in cat.children) {
            /* Set initial state */
            cat.children[i].hidden = true;

            if (cat.children[i].children) {
                this.filterChildren(cat.children[i], str);
            } else {
                if (cat.children[i].name.includes(str) ||
                    cat.children[i].slug.includes(str)) {
                    cat.children[i].hidden = false;
                    isChildShown = true;
                }
            }
        }

        if (isChildShown)
            cat.hidden = false;
    }
}