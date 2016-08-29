/**
 * This is the single post page
 */

import { Component, OnInit } from '@angular/core';
import { ViewChild}          from '@angular/core';
import { ActivatedRoute }    from '@angular/router';

import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import { AppState }          from '../../reducers';
import { hasEditorRole }     from '../../reducers';
import { PostsState }        from '../../reducers/posts';
import { AuthState }         from '../../reducers/auth';
import { CmsAttrsState }     from '../../reducers/cmsattrs';
import { PostActions }       from '../../actions';
import { AlertActions }      from "../../actions";

import { FROALA_OPTIONS }    from '../../models/froala.option';
import { Post }              from '../../models';
import { Category }          from '../../models';
import { Tag }               from '../../models';
import { Topic }             from '../../models';
import { zh_CN }             from '../../localization';



@Component({ template: require('./post.page.html') })
export class PostPage implements OnInit
{
    @ViewChild('postForm') postForm;

    authState: AuthState;
    //authState$: Observable<AuthState>;
    cmsState: CmsAttrsState;
    //cmsState$: Observable<CmsAttrsState>;

    // PostsState in post reducer
    postsState: PostsState;
    //postsState$: Observable<PostsState>;

    // Current post, inputPost is only used to initialize forala editor, cause
    // it is bugged when both input/output model are the same
    inputPost: Post;
    post: Post;
    
    froalaEditor: any;

    tabs = {'cat': false, 'tag': false, 'topic': false};

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) { }

    ngOnInit() {
        this.store.select<AuthState>('auth')
            .subscribe(authState => this.authState = authState);
        this.store.select<CmsAttrsState>('cms')
            .subscribe(cmsState => this.cmsState = cmsState);

        // Dispatch an action to create or load a post
        this.route.params.subscribe(params => {
            if (Object.keys(params).length === 0) {
                // New a post
                this.store.dispatch(PostActions.newPost());
            } else {
                // Edit a post
                this.store.dispatch(PostActions.loadPost(+params['id']));
            }
        });

        // Load the post
        this.store.select<PostsState>('posts').subscribe(postsState => {
            this.postsState = postsState;
            // When opening a single post, 'editing' always contains 1 id
            // Do a copy of the post, do not modify on the original one.
            this.inputPost = postsState.entities[postsState.editing[0]];
            if (this.inputPost) 
                this.post = Object.assign({}, this.inputPost, {author_id: this.myId});
        });
    }
    
    canDeactivate() {
        console.log("form status: ", this.postForm);
        if (this.postForm.dirty) {
            this.store.dispatch(AlertActions.error('请先保存当前更改再退出此页面'));
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

    get zh() { return zh_CN.post; } // Localization
    get froalaOptions() { return FROALA_OPTIONS; }
    

    postContentChanged($event) {
        // If no timeout set, the editor will throw an exception
        setTimeout(() => {
            console.log("Post content changed!");
            this.post.content = $event;
        });
    }
    
    // Category, tag, topic add/remove events
    addCat(cat/*: Category*/) {
        console.log("category state: ", cat);
        //this.store.dispatch(PostActions.addCategory(cat));
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



    // TODO: Need to get back a save success status and enable canDeactivate
    save() {
        console.error("***save()***");
        this.store.dispatch(PostActions.savePost(this.post));
    }
    save2Pending() { this.post.state = 'pending'; this.save(); }
    save2Draft()   { this.post.state = 'draft';   this.save(); }
    save2Publish() { this.post.state = 'publish'; this.save(); }
}
