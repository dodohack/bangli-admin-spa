/**
 * This is the single post edit page component
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FroalaEditorCompnoent } from "ng2-froala-editor/ng2-froala-editor";

import { PostService } from '../service/post.service';

@Component({
    templateUrl: 'app/cms/post.html',
    directives: [FroalaEditorCompnoent],
    providers: [PostService]
})
export class PostPage implements OnInit
{
    id: number;
    title: string;
    text: string;
    editor: any;

    options: any = {
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

        toolbarSticky: false,

        /* Language */
        language: 'zh_cn'
    };

    constructor(private route: ActivatedRoute,
                private postService: PostService) {}

    ngOnInit() {
        this.route.params.subscribe(
            segment => {
                /* Get post id from URL segment */
                console.log("Post::ngOnInit called");
                this.id = segment['id'] ? +segment['id'] : 0;
            }
        );

        /* Initialze editor content */
        this.getPost();
    }

    /**
     * This function is somehow bugged
     * @param event
     */
    onFroalaModelChanged(event: any) {
        setTimeout(() => {
            this.text = event;
            console.log("onFroalaModelChanged");
        });
    }

    onEditorInitialized(event?: any) {
        console.log("onEditorInitialized");
        this.editor = FroalaEditorCompnoent.getFroalaInstance();
        this.editor.on('froalaEditor.focus', (e, editor) => {
            console.log("editor is focused");
        });
    }

    private getPost()
    {
        this.postService.getPost(this.id).subscribe(
            json => {
                this.title = json['title'];
                this.text  = json['content'];
            }
        )
    }
}
