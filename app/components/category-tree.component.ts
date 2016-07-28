import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../models';

@Component({
    selector: 'category-tree',
    template:
    `
    <div *ngIf="isTreeRoot" class="filter-wrapper">
         <input placeholder="过滤" type="text" class="form-control" 
         #box (keyup)="filterTree(box.value)">
    </div>
    <ul *ngIf="categories" class="tree-view">
        <template ngFor let-cat [ngForOf]="categories">
        <li *ngIf="!cat.hidden" class="tree-item">
            <div class="checkbox" *ngIf="!cat.children">
                <label>
                    <input type="checkbox" [checked]="cat.checked" (click)="check(cat)" />
                    {{ cat.name }} | {{ cat.slug }}
                </label>
            </div>
            <span *ngIf="cat.children">+ {{cat.name}}</span>
            <category-tree [categories]="cat.children" (checkEvent)="addCat($event)"></category-tree>
        </li>
        </template>
    </ul>
    `,
    directives: [CategoryTreeComponent]
})
export class CategoryTreeComponent {
    /* Only show category filter on root level */
    @Input()
    isTreeRoot: boolean;

    @Input()
    categories: Category[];

    @Output()
    checkEvent = new EventEmitter();

    check(cat) {
        cat.checked = !cat.checked;
        /* Notify parent */
        this.checkEvent.emit(cat);
    }

    addCat(cat) {
        this.checkEvent.emit(cat);
    }

    filterTree(str: string)
    {
        for (let i in this.categories)
        {
            /* Set initial state */
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