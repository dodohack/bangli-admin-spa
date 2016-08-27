/**
 * This is the single post page
 */

import { Component, OnInit } from '@angular/core';
import { ViewChild}          from '@angular/core';
import { ActivatedRoute }    from '@angular/router';

import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';
import { FroalaEditorCompnoent } from 'ng2-froala-editor/ng2-froala-editor';

import { AppState, getPost } from '../../reducers';
import { hasEditorRole }     from '../../reducers';
import { PostsState }        from '../../reducers/posts';
import { PostActions }       from '../../actions';

import { FROALA_OPTIONS }    from '../../models/froala.option';
import { POST_TYPES } from '../../models';

import { User, Post, Category, Tag, Topic } from '../../models';

import { zh_CN } from '../../localization';

@Component({ template: require('./post.page.html') })
export class PostPage implements OnInit
{
    @ViewChild('postForm') postForm;

    /* PostsState in post reducer */
    postsState: PostsState;

    /* Current post */
    id: number;
    post: Post;

    froalaEditor: any;

    tabs = {'cat': false, 'tag': false, 'topic': false};

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.store.dispatch(PostActions.loadPost(this.id));
        });

        this.store.select<PostsState>('posts')
            .subscribe(postsState => this.postsState = postsState);

        this.store.let(getPost(this.id))
            .subscribe(post => {
                console.log("*** GET A NEW POST: ", post);
                this.post = Object.assign({}, post);
            });

    }
    
    canDeactivate() {
        console.log("canDeactivate called postForm: ", this.postForm);
        return true;
    }

    get isDraft() { return this.post.status === 'draft'; }
    get isPending() { return this.post.status === 'pending'; }
    get isPublish() { return this.post.status === 'publish'; }
    get hasEditorRole() { return this.store.let(hasEditorRole()); }

    get froalaOptions() {return FROALA_OPTIONS; }
    /* Post type enum(kind of) */
    get POST_TYPES() { return POST_TYPES; }
    
    /* Localization for cms post */
    get zh() { return zh_CN.post; }
    //get authors() { return this.userService.authors; }
    //get editors() { return this.userService.editors; }

    //get categories() { return this.postService.categories; }
    //get tags()       { return this.postService.tags; }
    //get topics()     { return this.postService.topics; }

    /**
     * NOTE: ngrx/effect 'savePost' happens before reducer 'SAVE_POST', is this
     * the behavior we want???
     */
    save() { console.error("***save()***"); this.store.dispatch(PostActions.savePost(this.post)); }
    save2Pending() { console.error("***savePending()***"); this.post.status = 'pending'; this.save(); }
    save2Draft() { console.error("***saveDraft()***"); this.post.status = 'draft'; this.save(); }
    save2Publish() { console.error("***savePublish()***"); this.post.status = 'publish'; this.save(); }

    /**
     * This function is somehow bugged
     * @param event
     */
    onFroalaModelChanged(event: any) {
        setTimeout(() => {
            //this.post.content = event;
            console.log("onFroalaModelChanged");
        });
    }

    onEditorInitialized(event?: any) {
        console.log("onEditorInitialized");
        this.froalaEditor = FroalaEditorCompnoent.getFroalaInstance();
        this.froalaEditor.on('froalaEditor.focus', (e, editor) => {
            console.log("editor is focused");
        });
    }

    onSelectAuthor(e: any) {
        console.log("Author selected: ", e.item.nicename);
    }

    onSelectEditor(e: any) {
        console.log("Editor selected: ", e.item.nicename);
    }
}