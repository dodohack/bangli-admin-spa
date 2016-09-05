import { Component, EventEmitter } from '@angular/core';
import { Input, Output, OnInit }   from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef }       from '@angular/core';
import { FormGroup, FormControl }  from '@angular/forms';
import { Category }                from '../../models';

@Component({
    selector: 'category-tree',
    template: require('./category-tree.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryTree implements OnInit {

    filterControl = new FormControl;
    filterText: string = '';
    filteredCats: Category[] = [];

    /* Only show category filter on root level */
    @Input() parentId: number;
    @Input() selectedCats: Category[];
    @Input() categories: Category[];

    @Output() checkEvent = new EventEmitter();

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.filterControl.valueChanges
            .debounceTime(100).subscribe(text => {
            this.filterText = text;
            this.filteredCats = this.filterCats(text, this.categories);
            this.cd.markForCheck();
        });
    }

    get updatedCats(): Category[] {
        let selectedIds: number[] = [];
        if (this.selectedCats) selectedIds = this.selectedCats.map(c => c.id);
        return this.categories.map(c => {
            let checked = selectedIds.indexOf(c.id) !== -1;
            return Object.assign({}, c, {checked: checked});
        });
    }
    
    get availableCats(): Category[] {
        return this.filterText === '' ? this.updatedCats : this.filteredCats;
    }

    getChild(cat: Category) {
        return this.categories.filter(v => v.parent_id === cat.id);
    }

    hasChild(cat: Category) {
        return this.getChild(cat).length;
    }

    /**
     * Return filtered categories and child categories
     */
    filterCats(text: string, cats: Category[]): Category[] {
        return cats.filter(pcat => {
            let isFound = pcat.slug.includes(text) || pcat.name.includes(text);
            if (!isFound) {
                // Search it's children
                let children = cats.filter(c => c.parent_id === pcat.id);
                return this.filterCats(text, children);
            }
            return isFound;
        });
    }
}
