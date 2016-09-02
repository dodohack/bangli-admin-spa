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
var htmlTag = {'&': '&amp;', '<': '&lt;', '>': '&gt;',
    '/p>': '/p&gt;<br>',
    '/h1>': '/h1&gt;<br>',
    '/h2>': '/h2&gt;<br>',
    '/h3>': '/h3&gt;<br>',
    '/h4>': '/h4&gt;<br>',
    '/h5>': '/h5&gt;<br>',
    '/h6>': '/h6&gt;<br>'};

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

        this.diffHtml = ''; // reset the diff output
        this.cd.markForCheck(); // Do change detection
    }

    replaceTag(tag) {
        return htmlTag[tag] || tag;
    }

    // TODO: We should escape html before doing diff, when doing escape, we should
    // TODO: put line end to the end tag such as </p>, </h1>, </h2> etc.
    // Diff selectedRevisions w/wo current version
    runDiff() {
        // NOTE: regexp shouldn't be quoted as string.
        // This regexp matches html tag: '<', '>', '&', '/p>', '/h[123456]>'
        let regexp = /[\/]?[h]?[123456p]?[&<>]/g;
        let firstBody = this.selectedRevisions[0].body.replace(regexp, this.replaceTag);
        let secondBody;

        // Load revisions from server.
        if (this.selectedRevisions.length == 2)
            secondBody = this.selectedRevisions[1].body.replace(regexp, this.replaceTag);
        else if (this.selectedRevisions.length == 1)
            secondBody = this.entity.content.replace(regexp, this.replaceTag);

        let diff = jsdiff.diffChars(firstBody, secondBody);
        var output = ''; // must be global variable
        diff.forEach(function(part) {
            if (part.added)
                output += '<ins>' + part.value + '</ins>';
            else if (part.removed)
                output += '<del>' + part.value + '</del>';
            else
                output += part.value;
        });
        this.diffHtml = output;
        //console.log("****untouched body: ", this.entity.content);
        //console.log("*****diff content: ", this.diffHtml);
        this.cd.markForCheck();
    }
}
