/**
 * This is the single post page
 */

import { Component }         from '@angular/core';
import { OnInit, OnDestroy } from "@angular/core";
import { ViewChild }         from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Store }             from '@ngrx/store';

import { AppState }          from '../../reducers';
import { hasEditorRole }     from '../../reducers';
import { PostsState }        from '../../reducers/posts';
import { AuthState }         from '../../reducers/auth';
import { CmsAttrsState }     from '../../reducers/cmsattrs';
import { PostActions }       from '../../actions';
import { AlertActions }      from "../../actions";

import { FroalaOptions }     from '../../models/froala.option';
import { Post }              from '../../models';
import { Category }          from '../../models';
import { Tag }               from '../../models';
import { Topic }             from '../../models';
import { zh_CN }             from '../../localization';

@Component({ template: require('./post.page.html') })
export class PostPage implements OnInit, OnDestroy
{
    @ViewChild('postForm') postForm;

    // subscriptions
    subAuth: any;
    subCms: any;
    subPosts: any;
    subParams: any;


    authState:  AuthState;
    cmsState:   CmsAttrsState;
    postsState: PostsState;

    // Current post, inputPost is only used to initialize forala editor, cause
    // it is bugged when both input/output model are the same
    inputPost: Post;
    post: Post;
    
    froalaEditor: any;

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) { }

    ngOnInit() {
        this.subAuth = this.store.select<AuthState>('auth')
            .subscribe(authState => this.authState = authState);
        this.subCms = this.store.select<CmsAttrsState>('cms')
            .subscribe(cmsState => this.cmsState = cmsState);

        // Dispatch an action to create or load a post
        this.dispatchLoadPost();
        // Load the post
        this.loadPost();
    }

    ngOnDestroy() {
        this.subAuth.unsubscribe();
        this.subCms.unsubscribe();
        this.subPosts.unsubscribe();
        this.subParams.unsubscribe();
    }

    /**
     * Kick an action to load the post when URL changes
     */
    dispatchLoadPost() {
        this.subParams = this.route.params.subscribe(params => {
            if (Object.keys(params).length === 0) // New a post
                this.store.dispatch(PostActions.newPost(/* FIXME: current user id */)); 
            else                                  // Edit a post
                this.store.dispatch(PostActions.loadPost(+params['id']));
        });
    }

    /**
     * Listen on ngrx/store, create a post from 'store' if state is changed
     */
    loadPost() {
        this.subPosts = this.store.select<PostsState>('posts').subscribe(postsState => {
            this.postsState = postsState;
            // When opening a single post, 'editing' always contains 1 id
            // FIXME: Remove inputPost after updating to new angular2-froala binding
            this.inputPost = postsState.entities[postsState.editing[0]];
            this.post = Object.assign({}, this.inputPost);
        });
    }
    
    canDeactivate() {
        console.log("form status: ", this.postForm);
        if (this.postForm.dirty) {
            this.store.dispatch(AlertActions.error('请先保存当前更改，或取消保存'));
            return false;
        } else {
            return true;
        }
    }

    get isDraft()   { return this.post.state === 'draft'; }
    get isPending() { return this.post.state === 'pending'; }
    get isPublish() { return this.post.state === 'publish'; }
    get myId() { return this.authState.users[this.authState.key].id; }
    get hasEditorRole() { return this.store.let(hasEditorRole()); }

    get zh() { return zh_CN.cms; } // Localization
    get froalaOptions() { return FroalaOptions.getDefault(); }
    

    postContentChanged($event) {
        // If no timeout set, the editor will throw an exception
        setTimeout(() => {
            console.log("Post content changed!");
            this.post.content = $event;
        });
    }
    
    // Category, tag, topic add/remove events
    selectCat(cat: Category) {
        // Unselect a category if is is previously selected, vice versa
        if (cat.checked) this.removeCat(cat.id);
        else this.addCat(cat);
    }
    addCat(cat: Category) {
        this.store.dispatch(PostActions.addCategory(cat));
    }
    addTag(tag: Tag) {
        this.store.dispatch(PostActions.addTag(tag));
    }
    addTopic(topic: Topic) {
        this.store.dispatch(PostActions.addTopic(topic));
    }
    removeCat(id: number) {
        this.store.dispatch(PostActions.removeCategory(id));
    }
    removeTag(id: number) {
        this.store.dispatch(PostActions.removeTag(id));
    }
    removeTopic(id: number) {
        this.store.dispatch(PostActions.removeTopic(id));
    }

    // Restore current content to given revision
    restoreRevision(rid: number) {
        this.store.dispatch(PostActions.applyRevision([this.post.id, rid]));
        this.store.dispatch(AlertActions.warning('请确认版本恢复正确后点击保存到服务器'));
    }

    // TODO: Need to get back a save success status and enable canDeactivate
    // TODO: We can listen on 'alerts' changes, if a successful alert is 
    // back with the id, type of current post, we can say enable 
    // canDeactivate
    save() {
        this.store.dispatch(PostActions.savePost(this.post));
    }
    save2Pending() { this.post.state = 'pending'; this.save(); }
    save2Draft()   { this.post.state = 'draft';   this.save(); }
    save2Publish() { this.post.state = 'publish'; this.save(); }
}
