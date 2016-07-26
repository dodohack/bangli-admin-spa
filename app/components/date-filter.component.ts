/**
 * Create date picker to filter given list from certain range
 */
import { Component } from "@angular/core";

@Component({
    selector: 'date-filter',
    template:
    `
    <select class="c-select select-sm">
        <option value="0" selected>全部日期</option>
        <option value="x">2016年5月</option>
        <option value="y">2016年4月</option>
        <option value="y">2016年3月</option>
    </select>
    `
})
export class DateFilterComponent {

}