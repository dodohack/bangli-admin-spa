import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Tag } from '../models';

@Component({
    selector: 'tag-cloud',
    template:
    `
    <div class="filter-wrapper">
         <input placeholder="过滤" type="text" class="form-control" 
         #box (keyup)="filterTag(box.value)">
    </div>
    <ul class="tag-cloud">
        <template ngFor let-tag [ngForOf]="tags">
        <li *ngIf="!tag.hidden" class="tag-item label label-pill label-success"
            [class.active]="tag.checked"
            (click)="check(tag)" >
            {{ tag.name }}
        </li>
        </template>
    </ul>
    `
})
export class TagCloudComponent {
    @Input()
    tags: Tag[];

    @Output()
    checkEvent = new EventEmitter();

    check(tag) {
        tag.checked = !tag.checked;
        /* Notify parent */
        this.checkEvent.emit(tag);
    }

    filterTag(str: string)
    {
        for (let i in this.tags)
        {
            /* Set initial state */
            this.tags[i].hidden = true;

            if (this.tags[i].name.includes(str) ||
                this.tags[i].slug.includes(str))
                this.tags[i].hidden = false;
        }
    }
}