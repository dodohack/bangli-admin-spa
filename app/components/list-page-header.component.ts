import { Component, Input, AfterContentInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'list-page-header',
    template:
    `
<div class="page-header">
    <h1 class="title">
        {{ pageTitle }}列表
        <a class="page-title-action btn btn-sm btn-info-outline" [routerLink]="['/', newItemUrl]">新建{{ pageTitle }}</a>
        <button class="page-title-action btn btn-sm btn-info-outline float-right">详简切换</button>
    </h1>
</div>
    `
})
export class ListPageHeaderComponent implements AfterContentInit {
    /* Page title of the list page */
    @Input()
    pageTitle: string;

    /* URL to create a new item of the list page */
    @Input()
    newItemUrl: string;
    
    constructor(private titleService: Title) {}

    ngAfterContentInit() {
        this.titleService.setTitle(this.pageTitle + '列表 - 葫芦娃管理平台');
    }
}