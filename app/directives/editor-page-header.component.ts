import { Component, Input, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { zh_CN }       from '../localization';

let t = require('./editor-page-header.html');
@Component({
    selector: 'editor-page-header',
    template: t
})
export class EditorPageHeaderComponent implements AfterContentInit {
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

    constructor(private titleService: Title) { }

    toggleRightBar() {
        //this.toggleEvent.emit();
    }

    get zh() { return zh_CN.post; }

    ngAfterContentInit() {
        //this.titleService.setTitle('编辑' + this.pageTitle + ' - '
        //    + this.authService.curDomain.name + '管理平台');
    }
}