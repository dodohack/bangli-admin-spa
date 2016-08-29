import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Tag } from '../../models';

@Component({
    selector: 'tag-cloud',
    template: require('./tag-cloud.html')
})
export class TagCloud {
    @Input()
    tags: Tag[];

    @Output()
    checkEvent = new EventEmitter();

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