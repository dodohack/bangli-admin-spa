import { Component, Input, Output, EventEmitter } from '@angular/core';
import { POST_STATUS_TRANS } from '../models';

let template = require('./editor-page-header.html');
@Component({
    selector: 'editor-page-header',
    template: template
})
export class EditorPageHeaderComponent {
    postStatusTranslation: any;

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
        this.postStatusTranslation = POST_STATUS_TRANS;
    }

    toggleRightBar() {
        //this.toggleEvent.emit();
    }
}