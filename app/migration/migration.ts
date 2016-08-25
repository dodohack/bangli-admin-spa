/**
 * Migrate Wordpress database
 */

import { Component }                     from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Title } from '@angular/platform-browser';

import { API_END_POINTS }      from '../api';
import { AuthService } from '../service/auth.service';

let template = require('./migration.html');
@Component({
    template: template
})
export class MigrationPage
{
    headers: Headers;
    
    /* Migration status/message returned from application server */
    status: any;
    message: any;

    /* If migration is under running */
    isRunning: boolean;

    constructor(private http: Http, 
                private title: Title,
                private authService: AuthService) {
        /* Set http authenticate header */
        this.headers =
            new Headers({'Authorization': 'Bearer ' + this.authService.jwt});

        this.isRunning = false;
        this.title.setTitle('数据移植 - 全局管理平台');
    }

    public migrateUser(domainKey: string) {
        this.message = "正在移植${domainKey}用户表,可能需要等几分钟或更长时间,请不要刷新页面";
        this.migrate('user', domainKey);
    }

    public migrateUserData(domainKey: string) {
        this.message = "正在移植${domainKey}用户基本数据,可能需要等几分钟或更长时间,请不要刷新页面";
        this.migrate('userdata', domainKey);
    }

    public migrateAttachment(domainKey: string) {
        this.message = "正在移植${domainKey}附件表,可能需要等几分钟或更长时间,请不要刷新页面";
        this.migrate('attachment', domainKey);
    }

    public migratePost(domainKey: string) {
        this.message = "正在移植${domainKey}文章和专题,可能需要等几分钟或更长时间,请不要刷新页面";
        this.migrate('post', domainKey);
    }

    public migrateProduct(domainKey: string) {
        this.message = "正在移植${domainKey}产品库,可能需要等几分钟或更长时间,请不要刷新页面";
        this.migrate('product', domainKey);
    }

    public migrateOrder(domainKey: string) {
        this.message = "正在移植${domainKey}订单数据,可能需要等几分钟或更长时间,请不要刷新页面";
        this.migrate('order', domainKey);
    }

    /**
     * Send request to API server to do wordpress database migration
     * @param endpoint: one of user, userdata, attachment, post, product, order
     * @param domainKey: which domain we are currently migrating data
     */
    private migrate(endpoint: string, domainKey: string) {

        /* Empty message */
        this.status = '';

        /* Toggle running status */
        this.isRunning = true;

        /* Get correct API endpoint */
        let API = API_END_POINTS[domainKey];
        
        let options = new RequestOptions({ headers: this.headers });

        return this.http.get(API.migrate_base + '/' + endpoint, options)
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
