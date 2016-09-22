import { Action }        from '@ngrx/store';
import { VoucherParams } from '../models';
import { Voucher }       from '../models';


export class VoucherActions {
    static SEARCH = '[Voucher] Search';
    static search(params: VoucherParams): Action {
        return {
            type: VoucherActions.SEARCH,
            payload: params
        };
    }

    static SEARCH_COMPLETE = '[Voucher] Search Complete';
    static searchComplete(results: Voucher[]): Action {
        return {
            type: VoucherActions.SEARCH_COMPLETE,
            payload: results
        };
    }

    static LOAD_VOUCHERS = '[Voucher] Load Vouchers';
    static loadVouchers(params: VoucherParams): Action {
        return {
            type: VoucherActions.LOAD_VOUCHERS,
            payload: params
        };
    }

    static LOAD_VOUCHERS_SUCCESS = '[Voucher] Load Vouchers Success';
    static loadVouchersSuccess(posts: Voucher[]): Action {
        return {
            type: VoucherActions.LOAD_VOUCHERS_SUCCESS,
            payload: posts
        };
    }

    static LOAD_VOUCHERS_FAIL = '[Voucher] Load Vouchers Fail';
    static loadVouchersFail(): Action {
        return {
            type: VoucherActions.LOAD_VOUCHERS_FAIL,
        };
    }

    static BATCH_EDIT_VOUCHERS = '[Voucher] Batch Edit Vouchers';
    static batchEditVouchers(ids: number[]): Action {
        return {
            type: VoucherActions.BATCH_EDIT_VOUCHERS,
            payload: ids
        };
    }

    static CANCEL_BATCH_EDIT_VOUCHERS = '[Voucher] Cancel Batch Edit Vouchers';
    static cancelBatchEditVouchers(): Action {
        return {
            type: VoucherActions.CANCEL_BATCH_EDIT_VOUCHERS
        };
    }

    static BATCH_DELETE_VOUCHERS = '[Voucher] Batch Delete Vouchers';
    static batchDeleteVouchers(ids: number[]): Action {
        return {
            type: VoucherActions.BATCH_DELETE_VOUCHERS,
            payload: ids
        };
    }

    static BATCH_OFFLINE_EDIT_VOUCHERS = '[Voucher] Batch Offline Edit Vouchers';
    static batchOfflineEditVouchers(ids: number[]): Action {
        return {
            type: VoucherActions.BATCH_OFFLINE_EDIT_VOUCHERS,
            payload: ids
        };
    }

    static BATCH_LOCK_VOUCHERS = '[Voucher] Batch Lock Vouchers';
    static batchLockVouchers(ids: number[]): Action {
        return {
            type: VoucherActions.BATCH_LOCK_VOUCHERS,
            payload: ids
        };
    }

    static BATCH_EDIT_PREVIOUS_VOUCHER = '[Voucher] Batch Edit Previous Voucher';
    static batchEditPreviousVoucher(): Action {
        return {
            type: VoucherActions.BATCH_EDIT_PREVIOUS_VOUCHER
        };
    }

    static BATCH_EDIT_NEXT_VOUCHER = '[Voucher] Batch Edit Next Voucher';
    static batchEditNextVoucher(): Action {
        return {
            type: VoucherActions.BATCH_EDIT_NEXT_VOUCHER
        };
    }

    static NEW_VOUCHER = '[Voucher] New Voucher';
    static newVoucher(): Action {
        return {
            type: VoucherActions.NEW_VOUCHER
        };
    }

    static LOAD_VOUCHER = '[Voucher] Load Voucher';
    static loadVoucher(id: number): Action {
        return {
            type: VoucherActions.LOAD_VOUCHER,
            payload: id
        };
    }

    static LOAD_VOUCHER_SUCCESS = '[Voucher] Load Voucher Success';
    static loadVoucherSuccess(post: Voucher): Action {
        return {
            type: VoucherActions.LOAD_VOUCHER_SUCCESS,
            payload: post
        };
    }

    static LOAD_VOUCHER_FAIL = '[Voucher] Load Voucher Fail';
    static loadVoucherFail(): Action {
        return {
            type: VoucherActions.LOAD_VOUCHER_FAIL,
        };
    }

    static AUTO_SAVE = '[Voucher] Auto Save';
    static autoSave(post: Voucher): Action {
        return {
            type: VoucherActions.AUTO_SAVE,
            payload: post
        };
    }

    static SAVE_VOUCHER = '[Voucher] Save Voucher';
    static saveVoucher(post: Voucher): Action {
        return {
            type: VoucherActions.SAVE_VOUCHER,
            payload: post
        };
    }

    static APPLY_REVISION = '[Voucher] Apply Revision';
    static applyRevision(ids: number[]): Action {
        return {
            type: VoucherActions.APPLY_REVISION,
            payload: ids
        };
    }

    static SAVE_VOUCHER_SUCCESS = '[Voucher] Save Voucher Success';
    static saveVoucherSuccess(post: Voucher): Action {
        return {
            type: VoucherActions.SAVE_VOUCHER_SUCCESS,
            payload: post
        };
    }

    static SAVE_VOUCHER_FAIL = '[Voucher] Save Voucher Fail';
    static saveVoucherFail(): Action {
        return {
            type: VoucherActions.SAVE_VOUCHER_FAIL
        };
    }

    static SAVE_VOUCHERS = '[Voucher] Save Vouchers';
    static saveVouchers(posts: Voucher[]): Action {
        return {
            type: VoucherActions.SAVE_VOUCHERS,
            payload: posts
        };
    }

    static REMOVE_CATEGORY = '[Voucher] Remove Category';
    static removeCategory(cat_id: number): Action {
        return {
            type: VoucherActions.REMOVE_CATEGORY,
            payload: cat_id
        };
    }
}
