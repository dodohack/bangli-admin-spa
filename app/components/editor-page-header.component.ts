import { Component, Input, Output, EventEmitter } from '@angular/core';

let template = require('./editor-page-header.html');
@Component({
    selector: 'editor-page-header',
    template: template
})
export class EditorPageHeaderComponent {
    /* Current page title */
    @Input()
    pageTitle: string;

    @Input()
    previewUrl: string;

    /* Url of back to list */
    @Input()
    backUrl: string;

    @Output()
    toggleEvent = new EventEmitter();

    toggleRightBar() {
        //this.toggleEvent.emit();
    }
}