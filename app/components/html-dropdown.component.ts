import { Component } from "@angular/core";
import { ContentChild } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { TemplateRef } from "@angular/core";
import { Input, Output } from "@angular/core";

/**
 * This component defines the template of a dropdown menu
 * REF: http://www.bennadel.com/blog/3116-using-an-item-template-with-an-html-dropdown-menu-component-in-angular-2-rc-3.htm
 */

@Component({
    selector: "html-dropdown",
    queries: {
        itemTemplate: new ContentChild(TemplateRef)
    },
    host: {
        "[class.is-open]": "isShowingItems"
    },
    template:
    `
    <div (click)="toggleItems()" class="dropdown-root" [ngSwitch]="!! value">
        <div *ngSwitchCase="true" class="dropdown-item-content">
            
            <template
                [ngTemplateOutlet]="itemTemplate"
                [ngOutletContext]="{ item: value, index: -1 }">
            </template>
        </div>
        <div *ngSwitchCase="false" class="placeholder">
            
            {{ placeholder || "Nothing Selected" }}
        </div>
    </div>
    <ul *ngIf="isShowingItems" class="dropdown-items">
        <li 
            *ngFor="let item of items ; let i = index ;" 
            (click)="selectItem( item )"
            class="dropdown-item">
            <div class="dropdown-item-content">
            
                <template 
                    [ngTemplateOutlet]="itemTemplate"
                    [ngOutletContext]="{ item: item, index: i }">
                </template>
            </div>
        </li>
    </ul>
    `
})
export class HtmlDropdownComponent {

    // If the dropdown items are being shown.
    public isShowingItems: boolean;

    // Collection of items used to render the dropdown items.
    @Input()
    public items: any[];

    // Text to show when no item is selected.
    @Input()
    public placeholder: string;

    // Currently selected value.
    @Input()
    public value: any;

    // Event stream that emits the item selected by the user.
    @Output()
    public valueChange: EventEmitter<any>;

    constructor() {
        this.isShowingItems = false;
        this.valueChange = new EventEmitter();
    }

    // Hide the dropdown items
    hideItems(): void {
        this.isShowingItems = false;
    }

    // Select given item
    // NOTE: Since this is a one-way data flow, the selection is being emitted
    // rather than applied directly to the value.
    selectItem(item: any) : void {
        this.hideItems();
        this.valueChange.emit(item);
    }

    // Show the dropdown menu
    showItems() : void {
        this.isShowingItems = true;
    }

    toggleItems() : void {
        this.isShowingItems = !this.isShowingItems;
    }
}