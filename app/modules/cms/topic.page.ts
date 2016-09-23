/**
 *  For each topic page, we have an extra column to have deal information stored
 *  , so that when we have a topic, we will automatically create a deal topic
 *  for it.
 */

import { Component, OnInit } from '@angular/core';

@Component({
    template: require('./topic.page.html')
})

export class TopicPage implements OnInit
{
    constructor() {}

    ngOnInit()
    {

    }
}
