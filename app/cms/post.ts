/**
 * This is the single post edit page component
 */

import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {FroalaEditorCompnoent} from "ng2-froala-editor/ng2-froala-editor";


@Component({
    templateUrl: 'app/cms/post.html',
    directives: [ROUTER_DIRECTIVES, FroalaEditorCompnoent]
})
export class PostPage implements OnInit
{
    text: string = '<div>Hey this is Froala Editor</div>';
    editor: any;

    froalaOptions: any = {
        /*
         * Save the content
         */
        saveParam: 'content',
        saveURL: '/admin/api/ajax/saveCmsPost',
        saveMethod: 'POST',

        /* Past in WYSIWYG edit in plain text */
        pastePlain: true,

        /* Editor height in pixel */
        height: 600,

        /* Toolbars */
        toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline',
            'fontSize', 'color',
            'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent',
            'indent', 'insertHR', 'insertLink',
            'insertImage', 'insertVideo', 'insertFile',
            'insertTable', 'undo', 'redo', 'clearFormatting', 'html'],

        toolbarButtonsMD: ['fullscreen', 'bold', 'italic', 'underline',
            'fontSize', 'color',
            'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent',
            'indent', 'insertHR', 'insertLink',
            'insertImage', 'insertVideo', 'insertFile',
            'insertTable', 'undo', 'redo', 'clearFormatting', 'html'],

        toolbarSticky: false,

        /* Language */
        language: 'zh_cn'
    };

    constructor() {}

    ngOnInit() {}

    onFroalaModelChanged(event: any) {
        setTimeout(() => this.text = event);
    }

    onEditorInitialized(event?: any) {
        this.editor = FroalaEditorCompnoent.getFroalaInstance();
        this.editor.on('froalaEditor.focus', (e, editor) => {
            console.log("editor is focused");
        });
    }
}
