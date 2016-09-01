/**
 * Display a list of revisions for current entity
 */
import { Component }     from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter }  from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { Post }          from "../../models";
import { Revision }      from "../../models";
import { CmsAttrsState } from "../../reducers/cmsattrs";
import { zh_CN }         from '../../localization';

var diff = require('../../libs/google-diff');

@Component({
    selector: 'revision-history',
    template: require('./revision.history.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RevisionHistory
{
    @Input() entity: any; // The post/page/product currently editing
    @Input() cmsState: CmsAttrsState;

    selectedRevisions: Revision[] = [];

    // Diff output in html format
    diffHtml: string;

    get authors() { return this.cmsState.authors; }

    isSelected(revision) {
        if (this.selectedRevisions.length) return false;
        return this.selectedRevisions.indexOf(revision) !== -1;
    }

    // Compare can be done with 2 selected revisions or
    // 1 selected revision + current version.
    get canCompare() {
        let length = this.selectedRevisions.length;
        return (length === 1 || length === 2) ? true : false;
    }

    // Add/remove given revision to/from selectedRevisions
    checkRevision(revision) {
        // Only maximum 2 version will be selected
        if (this.selectedRevisions.length > 1)
            this.selectedRevisions.pop();

        let idx = this.selectedRevisions.indexOf(revision);
        if (idx !== -1)
            this.selectedRevisions.splice(idx, 1); // Remove
        else
            this.selectedRevisions.push(revision); // Add
    }

    // Diff selectedRevisions w/wo current version
    runDiff() {
        if (this.selectedRevisions.length == 2) {
            this.doDiff(this.selectedRevisions[0],
                this.selectedRevisions[1]);
        } else if (this.selectedRevisions.length == 1) {
            this.doDiff(this.selectedRevisions[0],
                this.entity);
        }
    }

    // Diff 2 entities
    doDiff(v1: any, v2: any) {
        // call 3rd party library on v1.content and v2.content.
        let diffs = diff.diff_main(v1.content, v2.content);
        // Produce a human readable format
        diff.diff_cleanupSemantic(diffs);
        this.diffHtml = diff.diff_prettyHtml(diffs);
    }
}
