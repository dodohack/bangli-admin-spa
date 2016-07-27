import { Component, Input } from '@angular/core';

@Component({
    selector: 'list-page-menu',
    template:
    `
    <ul class="nav navbar-nav">
        <li class="nav-item">
            <a class="nav-link" [routerLink]="['/', baseUrl]">全部</a>
        </li>
        
        <li *ngIf="byMe">
            <a class="nav-link">我的</a>
        </li>
  
        <li *ngIf="authors" class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-toggle="dropdown" role="button"
               aria-haspopup="true" aria-expanded="false">作者（{{ authors.length }}）</a>

            <div class="dropdown-menu">
                <a *ngFor="let author of authors; let i=index" class="dropdown-item"
                   [routerLink]="['/', baseUrl, '/author', author.id]">
                    {{ i+1 }}. {{ author.nicename }}（{{ author.name }}）
                </a>
            </div>
        </li>

        <li *ngIf="editors" class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-toggle="dropdown" role="button"
               aria-haspopup="true" aria-expanded="false">编辑（{{ editors.length }}）</a>

            <div class="dropdown-menu">
                <a *ngFor="let editor of editors; let i=index" class="dropdown-item"
                   [routerLink]="['/', baseUrl, '/editor', editor.id]">
                    {{ i+1 }}. {{ editor.nicename }}（{{ editor.name }}）
                </a>
            </div>
        </li>

        <!-- Various order status tabs -->
        <li *ngFor="let status of statuses" class="nav-item">
            <a class="nav-link" [routerLink]="['/', baseUrl, status.status]">
                {{ status.status }}<span style="color:grey;">（{{ status.count }}）</span>
            </a>
        </li>
    </ul>
    `
})
export class ListPageMenuComponent {
    
    /* URL base for all menu items */
    @Input()
    baseUrl: string;

    /* Filter list items created by me */
    @Input()
    byMe: string;

    /* Filter list items by status */
    /* FIXME: Need to translate statuses[].status */
    @Input()
    statuses: string;

    /* Optional, filter list items by author */
    @Input()
    authors: string;

    /* Optional, filter list items by editor */
    @Input()
    editors: string;
}