/**
 * Migrate Wordpress database
 */

import { Component } from '@angular/core';
import { Http, URLSearchParams }   from '@angular/http';

import { APP } from '../app.api';
import { AuthService } from '../service/auth.service';

let template = require('./migration.html');
@Component({
    template: template
})
export class MigrationPage
{
    /* Migration status/message returned from application server */
    status: any;
    message: any;

    /* If migration is under running */
    isRunning: boolean;

    constructor(private http: Http, private authService: AuthService) {
        this.isRunning = false;
    }

    public migrateUser() {
        this.message = '正在移植用户表,可能需要等几分钟或更长时间,请不要刷新页面';
        this.migrate('user');
    }

    public migrateUserData() {
        this.message = '正在移植用户基本数据,可能需要等几分钟或更长时间,请不要刷新页面';
        this.migrate('userdata');
    }

    public migrateAttachment() {
        this.message = '正在移植附件表,可能需要等几分钟或更长时间,请不要刷新页面';
        this.migrate('attachment');
    }

    public migratePost() {
        this.message = '正在移植文章和专题,可能需要等几分钟或更长时间,请不要刷新页面';
        this.migrate('post');
    }

    public migrateProduct() {
        this.message = '正在移植产品库,可能需要等几分钟或更长时间,请不要刷新页面';
        this.migrate('product');
    }

    public migrateOrder() {
        this.message = '正在移植订单数据,可能需要等几分钟或更长时间,请不要刷新页面';
        this.migrate('order');
    }

    /**
     * Send request to API server to do wordpress database migration
     * @param endpoint: one of user, userdata, attachment, post, product, order
     */
    private migrate(endpoint: string) {

        /* Empty message */
        this.status = '';

        /* Toggle running status */
        this.isRunning = true;

        let params = new URLSearchParams;
        params.append('token', this.authService.getJwt());

        return this.http
            .get(APP.migrate_base + '/' + endpoint, {search: params})
            .map(res => res.json())
            .subscribe(
                res   => {
                    /* TODO: Remove it */
                    console.log(res);
                    this.status  = JSON.stringify(res);
                    this.isRunning = !this.isRunning;
                    this.message = '数据移植完毕,服务器返回了以下信息';
                },
                error => {
                    /* TODO: Remove it */
                    console.error(error);
                    this.status  = error;
                    this.isRunning = !this.isRunning;
                    this.message = '数据移植出错,服务器返回了以下信息';
                }
            );
    }
}