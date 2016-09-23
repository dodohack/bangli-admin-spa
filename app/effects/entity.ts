/**
 * Side effects for entities listed below:
 * cms-post, cms-topic, cms-page, deal-post, deal-topic, shop-order,
 * shop-product, voucher, newsletter
 */
import { Injectable }      from '@angular/core';
import { Http }            from '@angular/http';
import { Effect, Actions } from '@ngrx/effects';
import { Observable }      from 'rxjs/Observable';

import { BaseEffects }       from './base';
import { EntityActions }     from '../actions';
import { PostActions }       from '../actions';
import { TopicActions }      from '../actions';
import { DealPostActions }   from '../actions';
import { DealTopicActions }  from '../actions';
import { PageActions }       from '../actions';
import { NewsletterActions } from '../actions';
import { ProductActions }    from '../actions';
import { OrderActions }      from '../actions';
import { VoucherActions }    from '../actions';

import { AlertActions }    from '../actions';


@Injectable()
export class EntityEffects extends BaseEffects {

    constructor (private actions$: Actions,
                 protected http: Http) {
        super(http);
    }


    /**************************************************************************
     * Entity
     *************************************************************************/
    @Effect() loadEntities$ = this.actions$.ofType(EntityActions.LOAD_ENTITIES)
        .switchMap(action => this.getEntities(action.payload.etype, action.payload.data)
            .map(ret => EntityActions.loadEntitiesSuccess(ret.etype, ret))
            .catch(() => Observable.of(EntityActions.loadEntitiesFail()))
        );

    @Effect() loadEntity$ = this.actions$.ofType(EntityActions.LOAD_ENTITY)
        .switchMap(action => this.getEntity(action.payload.etype, action.payload.data)
            .map(ret => EntityActions.loadEntitySuccess(ret.etype, ret.entity))
            .catch(() => Observable.of(EntityActions.loadEntityFail()))
        );

    @Effect() putEntity$ = this.actions$.ofType(EntityActions.SAVE_ENTITY)
        .switchMap(action => this.saveEntity(action.payload.etype, action.payload.data)
            .map(ret => EntityActions.saveEntitySuccess(ret.etype, ret.entity))
            .catch(() => Observable.of(EntityActions.saveEntityFail()))
        );

    @Effect() saveEntitySuccess$ = this.actions$.ofType(EntityActions.SAVE_ENTITY_SUCCESS)
        .map(action => AlertActions.success('保存成功!'));

    @Effect() saveEntityFail$ = this.actions$.ofType(EntityActions.SAVE_ENTITY_FAIL)
        .map(action => AlertActions.error('保存失败!'));


    /**************************************************************************
     * CMS Post
     *************************************************************************/
    @Effect() loadPosts$ = this.actions$.ofType(PostActions.LOAD_POSTS)
        .switchMap(action => this.getEntities('cms-post', action.payload)
            .map(posts => PostActions.loadPostsSuccess(posts))
            .catch(() => Observable.of(PostActions.loadPostsFail()))
        );

    @Effect() loadPost$ = this.actions$.ofType(PostActions.LOAD_POST)
        .switchMap(action => this.getEntity('cms-post', action.payload)
            .map(post => PostActions.loadPostSuccess(post))
            .catch(() => Observable.of(PostActions.loadPostFail()))
        );

    @Effect() putPost$ = this.actions$.ofType(PostActions.SAVE_POST)
        .switchMap(action => this.saveEntity('cms-post', action.payload)
            .map(post => PostActions.savePostSuccess(post))
            .catch(() => Observable.of(PostActions.savePostFail()))
        );

    @Effect() savePostSuccess$ = this.actions$.ofType(PostActions.SAVE_POST_SUCCESS)
        .map(action => AlertActions.success('文章保存成功!'));
    
    @Effect() savePostFail$ = this.actions$.ofType(PostActions.SAVE_POST_FAIL)
        .map(action => AlertActions.error('文章保存失败!'));


    /**************************************************************************
     * CMS Topic 
     *************************************************************************/
    @Effect() loadTopics$ = this.actions$.ofType(TopicActions.LOAD_TOPICS)
        .switchMap(action => this.getEntities('cms-topic', action.payload))
        .map(topics => TopicActions.loadTopicsSuccess(topics))
        .catch(() => Observable.of(TopicActions.loadTopicsFail()));

    @Effect() loadTopic$ = this.actions$.ofType(TopicActions.LOAD_TOPIC)
        .switchMap(action => this.getEntity('cms-topic', action.payload))
        .map(topic => TopicActions.loadTopicSuccess(topic))
        .catch(() => Observable.of(TopicActions.loadTopicFail()));

    @Effect() putTopic$ = this.actions$.ofType(TopicActions.SAVE_TOPIC)
        .switchMap(action => this.saveEntity('cms-topic', action.payload)
            .map(topic => TopicActions.saveTopicSuccess(topic))
            .catch(() => Observable.of(TopicActions.saveTopicFail()))
        );

    @Effect() saveTopicSuccess$ = this.actions$.ofType(TopicActions.SAVE_TOPIC_SUCCESS)
        .map(action => AlertActions.success('专题保存成功!'));

    @Effect() saveTopicFail$ = this.actions$.ofType(TopicActions.SAVE_TOPIC_FAIL)
        .map(action => AlertActions.error('专题保存失败!'));



    /**************************************************************************
     * Deal Post
     *************************************************************************/
    @Effect() loadDealPosts$ = this.actions$.ofType(DealPostActions.LOAD_POSTS)
        .switchMap(action => this.getEntities('deal-post', action.payload)
            .map(posts => DealPostActions.loadPostsSuccess(posts))
            .catch(() => Observable.of(DealPostActions.loadPostsFail()))
        );

    @Effect() loadDealPost$ = this.actions$.ofType(DealPostActions.LOAD_POST)
        .switchMap(action => this.getEntity('deal-post', action.payload)
            .map(post => DealPostActions.loadPostSuccess(post))
            .catch(() => Observable.of(DealPostActions.loadPostFail()))
        );

    @Effect() putDealPost$ = this.actions$.ofType(DealPostActions.SAVE_POST)
        .switchMap(action => this.saveEntity('deal-post', action.payload)
            .map(post => DealPostActions.savePostSuccess(post))
            .catch(() => Observable.of(DealPostActions.savePostFail()))
        );

    @Effect() saveDealPostSuccess$ = this.actions$.ofType(DealPostActions.SAVE_POST_SUCCESS)
        .map(action => AlertActions.success('优惠保存成功!'));

    @Effect() saveDealPostFail$ = this.actions$.ofType(DealPostActions.SAVE_POST_FAIL)
        .map(action => AlertActions.error('优惠保存失败!'));

    /**************************************************************************
     * Deal Topic
     *************************************************************************/
    @Effect() loadDealTopics$ = this.actions$.ofType(DealTopicActions.LOAD_TOPICS)
        .switchMap(action => this.getEntities('deal-topic', action.payload))
        .map(topics => DealTopicActions.loadTopicsSuccess(topics))
        .catch(() => Observable.of(DealTopicActions.loadTopicsFail()));

    @Effect() loadDealTopic$ = this.actions$.ofType(DealTopicActions.LOAD_TOPIC)
        .switchMap(action => this.getEntity('deal-topic', action.payload))
        .map(topic => DealTopicActions.loadTopicSuccess(topic))
        .catch(() => Observable.of(DealTopicActions.loadTopicFail()));

    @Effect() putDealTopic$ = this.actions$.ofType(DealTopicActions.SAVE_TOPIC)
        .switchMap(action => this.saveEntity('deal-topic', action.payload)
            .map(topic => DealTopicActions.saveTopicSuccess(topic))
            .catch(() => Observable.of(DealTopicActions.saveTopicFail()))
        );

    @Effect() saveDealTopicSuccess$ = this.actions$.ofType(DealTopicActions.SAVE_TOPIC_SUCCESS)
        .map(action => AlertActions.success('优惠专题保存成功!'));

    @Effect() saveDealTopicFail$ = this.actions$.ofType(DealTopicActions.SAVE_TOPIC_FAIL)
        .map(action => AlertActions.error('优惠专题保存失败!'));


    /**************************************************************************
     * Cms Page
     *************************************************************************/    
    @Effect() loadPages$ = this.actions$.ofType(PageActions.LOAD_PAGES)
        .switchMap(action => this.getEntities('page-post', action.payload))
        .map(pages => PageActions.loadPagesSuccess(pages))
        .catch(() => Observable.of(PageActions.loadPagesFail()));

    @Effect() loadPage$ = this.actions$.ofType(PageActions.LOAD_PAGE)
        .switchMap(action => this.getEntity('page-post', action.payload))
        .map(page => PageActions.loadPageSuccess(page))
        .catch(() => Observable.of(PageActions.loadPageFail()));

    @Effect() putPage$ = this.actions$.ofType(PageActions.SAVE_PAGE)
        .switchMap(action => this.saveEntity('page-post', action.payload)
            .map(post => PageActions.savePageSuccess(post))
            .catch(() => Observable.of(PageActions.savePageFail()))
        );


    /**************************************************************************
     * Newsletters
     *************************************************************************/
    @Effect() loadNLs$ = this.actions$.ofType(NewsletterActions.LOAD_NEWSLETTERS)
        .switchMap(action => this.getEntities('newsletter-post', action.payload)
            .map(posts => NewsletterActions.loadNewslettersSuccess(posts))
            .catch(() => Observable.of(NewsletterActions.loadNewslettersFail()))
        );

    @Effect() loadNL$ = this.actions$.ofType(NewsletterActions.LOAD_NEWSLETTERS)
        .switchMap(action => this.getEntity('newsletter-post', action.payload)
            .map(post => NewsletterActions.loadNewsletterSuccess(post))
            .catch(() => Observable.of(NewsletterActions.loadNewsletterFail()))
        );

    @Effect() putNL$ = this.actions$.ofType(NewsletterActions.SAVE_NEWSLETTERS)
        .switchMap(action => this.saveEntity('newsletter-post', action.payload)
            .map(post => NewsletterActions.saveNewsletterSuccess(post))
            .catch(() => Observable.of(NewsletterActions.saveNewsletterFail()))
        );

    
    /**************************************************************************
     * Shop Products
     *************************************************************************/
    @Effect() loadProducts$ = this.actions$.ofType(ProductActions.LOAD_PRODUCTS)
        .switchMap(action => this.getEntities('shop-product', action.payload))
        .map(products => ProductActions.loadProductsSuccess(products))
        .catch(() => Observable.of(ProductActions.loadProductsFail()));

    @Effect() loadProduct$ = this.actions$.ofType(ProductActions.LOAD_PRODUCT)
        .switchMap(action => this.getEntity('shop-product', action.payload))
        .map(product => ProductActions.loadProductSuccess(product))
        .catch(() => Observable.of(ProductActions.loadProductFail()));

    @Effect() putProduct$ = this.actions$.ofType(ProductActions.SAVE_PRODUCT)
        .switchMap(action => this.saveEntity('shop-product', action.payload)
            .map(product => ProductActions.saveProductSuccess(product))
            .catch(() => Observable.of(ProductActions.saveProductFail()))
        );

    @Effect() saveProductSuccess$ = this.actions$.ofType(ProductActions.SAVE_PRODUCT_SUCCESS)
        .map(action => AlertActions.success('产品保存成功!'));

    @Effect() saveProductFail$ = this.actions$.ofType(ProductActions.SAVE_PRODUCT_FAIL)
        .map(action => AlertActions.error('产品保存失败!'));


    /**************************************************************************
     * Shop Orders
     *************************************************************************/
    @Effect() loadOrders$ = this.actions$.ofType(OrderActions.LOAD_ORDERS)
        .switchMap(action => this.getEntities('shop-order', action.payload))
        .map(orders => OrderActions.loadOrdersSuccess(orders))
        .catch(() => Observable.of(OrderActions.loadOrdersFail()));

    @Effect() loadOrder$ = this.actions$.ofType(OrderActions.LOAD_ORDER)
        .switchMap(action => this.getEntity('shop-order', action.payload)
            .map(order => OrderActions.loadOrderSuccess(order))
            .catch(() => Observable.of(OrderActions.loadOrderFail()))
        );

    @Effect() putOrder$ = this.actions$.ofType(OrderActions.SAVE_ORDER)
        .switchMap(action => this.saveEntity('shop-order', action.payload)
            .map(order => OrderActions.saveOrderSuccess(order))
            .catch(() => Observable.of(OrderActions.saveOrderFail()))
        );

    @Effect() saveOrderSuccess$ = this.actions$.ofType(OrderActions.SAVE_ORDER_SUCCESS)
        .map(action => AlertActions.success('订单保存成功!'));

    @Effect() saveOrderFail$ = this.actions$.ofType(OrderActions.SAVE_ORDER_FAIL)
        .map(action => AlertActions.error('订单保存失败!'));


    /**************************************************************************
     * Shop Vouchers
     *************************************************************************/
    @Effect() loadVouchers$ = this.actions$.ofType(VoucherActions.LOAD_VOUCHERS)
        .switchMap(action => this.getEntities('shop-voucher', action.payload)
            .map(vouchers => VoucherActions.loadVouchersSuccess(vouchers))
            .catch(() => Observable.of(VoucherActions.loadVouchersFail()))
        );

    @Effect() loadVoucher$ = this.actions$.ofType(VoucherActions.LOAD_VOUCHER)
        .switchMap(action => this.getEntity('shop-voucher', action.payload)
            .map(voucher => VoucherActions.loadVoucherSuccess(voucher))
            .catch(() => Observable.of(VoucherActions.loadVoucherFail()))
        );

    @Effect() putVoucher$ = this.actions$.ofType(VoucherActions.SAVE_VOUCHER)
        .switchMap(action => this.saveEntity('shop-voucher', action.payload)
            .map(voucher => VoucherActions.saveVoucherSuccess(voucher))
            .catch(() => Observable.of(VoucherActions.saveVoucherFail()))
        );

    @Effect() saveVoucherSuccess$ = this.actions$.ofType(VoucherActions.SAVE_VOUCHER_SUCCESS)
        .map(action => AlertActions.success('优惠券保存成功!'));

    @Effect() saveVoucherFail$ = this.actions$.ofType(VoucherActions.SAVE_VOUCHER_FAIL)
        .map(action => AlertActions.error('优惠券保存失败!'));
}