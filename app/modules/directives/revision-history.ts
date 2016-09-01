/**
 * Display a list of revisions for current entity
 */
import { Component }     from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter }  from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

import { Post }          from "../../models";
import { Revision }      from "../../models";
import { CmsAttrsState } from "../../reducers/cmsattrs";
import { zh_CN }         from '../../localization';

var jsdiff = require('diff');

@Component({
    selector: 'revision-history',
    template: require('./revision-history.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RevisionHistory
{
    @Input() entity: any; // The post/page/product currently editing
    @Input() cmsState: CmsAttrsState;

    selectedRevisions: Revision[] = [];

    // Load selected revisions from server
    //@Output() loadRevisions = new EventEmitter();

    // Apply selected revision content to current reversion
    //@Output() applyRevision = new EventEmitter();

    // Diff output in html format
    diffHtml: string;

    constructor(private cd: ChangeDetectorRef) {}

    get zh() { return zh_CN.post; }
    get authors() { return this.cmsState.authors; }
    get revisions() { return this.entity.revisions.slice().reverse(); }

    isSelected(revision) {
        if (!this.selectedRevisions.length) return false;
        return this.selectedRevisions.indexOf(revision) !== -1;
    }

    // Compare can be done with 2 selected revisions or
    // 1 selected revision + current version.
    get canCompare() {
        let length = this.selectedRevisions.length;
        return (length === 1 || length === 2) ? true : false;
    }

    // Add/remove given revision to/from selectedRevisions
    // Only maximum 2 version will be selected
    checkRevision(revision) {
        let idx = this.selectedRevisions.indexOf(revision);
        if (idx !== -1) this.selectedRevisions.splice(idx, 1); // Remove

        if (this.selectedRevisions.length > 1)
            this.selectedRevisions.splice(0, 1);

        // Only add when it is not found
        if (idx === -1) this.selectedRevisions.push(revision);
    }

    // TODO: We should escape html before doing diff, when doing escape, we should
    // TODO: put line end to the end tag such as </p>, </h1>, </h2> etc.
    // Diff selectedRevisions w/wo current version
    runDiff() {
        let regexp = /(<([^>]+)>)/ig;
        let firstBody = this.selectedRevisions[0].body.replace(regexp, "");
        let secondBody;

        // Load revisions from server.
        if (this.selectedRevisions.length == 2)
            secondBody = this.selectedRevisions[1].body.replace(regexp, "");
        else if (this.selectedRevisions.length == 1)
            secondBody = this.entity.content.replace(regexp, "");

        let diff = jsdiff.diffChars(firstBody, secondBody);
        var output = '';
        diff.forEach(function(part) {
            if (part.added)
                output += '<ins>' + part.value + '</ins>';
            else if (part.removed)
                output += '<del>' + part.value + '</del>';
            else
                output += part.value;
        });
        this.diffHtml = output;
        this.cd.markForCheck();
    }
}
