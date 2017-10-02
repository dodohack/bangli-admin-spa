/**
 * This is the component for a single newsletter
 */

import { Component, OnInit } from '@angular/core';
import { Title }             from '@angular/platform-browser';

@Component({ templateUrl: './newsletter.page.html' })
export class NewsletterPage implements OnInit
{
    constructor(private titleService: Title) {}

    ngOnInit() {
        this.titleService.setTitle('Newsletter - 葫芦娃管理平台');
    }

    canDeactivate() {
        return true;
    }
}