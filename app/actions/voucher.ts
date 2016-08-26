import { Action }  from '@ngrx/store';
import { Voucher } from '../models';

export class VoucherActions {
    static SEARCH = '[Voucher] Search';
    static search(query: string): Action {
        return {
            type: VoucherActions.SEARCH,
            payload: query
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
    static loadVouchers(filters: any): Action {
        return {
            type: VoucherActions.LOAD_VOUCHERS,
            payload: filters
        };
    }

    static LOAD_VOUCHERS_SUCCESS = '[Voucher] Load Vouchers Success';
    static loadVouchersSuccess(products: Voucher[]): Action {
        return {
            type: VoucherActions.LOAD_VOUCHERS_SUCCESS,
            payload: products
        };
    }

    static LOAD_VOUCHERS_FAIL = '[Voucher] Load Products Fail';
    static loadVouchersFail(): Action {
        return {
            type: VoucherActions.LOAD_VOUCHERS_FAIL,
        };
    }
}