import { Component, Input, Output, EventEmitter } from '@angular/core';
import { zh_CN } from '../localization';

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

    @Input()
    postStatus: string;

    @Output()
    toggleEvent = new EventEmitter();

    constructor() {
    }

    toggleRightBar() {
        //this.toggleEvent.emit();
    }

    get zh() {
        return zh_CN.post;
    }
}