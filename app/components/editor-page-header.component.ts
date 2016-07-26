import { Component, Input } from '@angular/core';

@Component({
    selector: 'editor-page-header',
    template: 
    `
<div class="page-header">
    <!-- Display current post url if any -->
    <div class="float-right" *ngIf="previewUrl">
        <span class="label label-default">
            预览: <a href="{{previewUrl}}" target="_blank">{{ previewUrl }}</a>
        </span>
    </div>

    <h1 class="title">
        编辑{{ pageTitle }}
        <a class="page-title-action btn btn-info-outline btn-sm" [routerLink]="['/', backUrl]">
            <i class="fa fa-backward"></i> 返回列表
        </a>
        <a class="page-title-action btn btn-info-outline btn-sm" (click)="toggleRightBar()">
            <span *ngIf="hideRightBar">显示侧栏</span><span *ngIf="!hideRightBar">隐藏侧栏</span>
        </a>
    </h1>
</div>
    `
})
export class EditorPageHeaderComponent {
    hideRightBar = true;

    /* Current page title */
    @Input()
    pageTitle: string;

    @Input()
    previewUrl: string;

    /* Url of back to list */
    @Input()
    backUrl: string;

    toggleRightBar() {
        this.hideRightBar = !this.hideRightBar;
    }
}