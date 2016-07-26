/**
 * A common search component for all kind of list page
 */
import { Component } from "@angular/core";

@Component({
    selector: 'search-box',
    template:
    `
    <form class="form-inline pull-xs-right">
        <input class="form-control input-sm" type="text" placeholder="搜索">
        <button class="btn btn-sm btn-success-outline" type="submit">搜索</button>
    </form>
    `
})
export class SearchBoxComponent {

}