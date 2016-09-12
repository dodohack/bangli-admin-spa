/**
 * Cms tag settings
 */
import { Component }         from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Store }             from '@ngrx/store';

import { AppState }          from '../../../reducers';
import { CmsAttrsState }     from "../../../reducers/cmsattrs";
import { Tag }               from "../../../models";

@Component({ template: require('./tag.setting.html') })
export class TagSetting implements OnInit, OnDestroy
{
    subCms: any;
    subParams: any;

    cmsState: CmsAttrsState;

    tags: Tag[];
    channel: string;

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) {}

    ngOnInit() {
        this.subCms = this.store.select<CmsAttrsState>('cms')
            .subscribe(cmsState => this.cmsState = cmsState);
        this.subParams = this.route.params.subscribe(params => {
            this.channel = params['channel'];
            this.filterTags();
        });
    }

    ngOnDestroy() {
        this.subCms.unsubscribe();
        this.subParams.unsubscribe();
    }

    // Edit a tag, we should popup a modal to do this
    edit(tag: Tag) {
        console.error("Popup a modal to do edit tag: ", tag);
    }

    remove(tag: Tag) {
        console.error("Popup a modal to let user confirm remove tag: ", tag);
    }
    
    filterTags() {
        // Get channel id
        let chId = this.cmsState.channels
            .filter(ch => ch.slug === this.channel);
        if (chId.length)
            this.tags = this.cmsState.tags
                .filter(t => t.channel_id === chId[0]);
        else
            this.tags = [];
    }
}
