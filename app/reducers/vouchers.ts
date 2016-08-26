/**
 * Shop voucher reducer
 */
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action }     from '@ngrx/store';

import { Paginator }      from '../models';
import { Voucher }        from '../models';
import { VoucherActions } from '../actions';

export interface VouchersState {
    ids: number[];
    entities: { [id: number]: Voucher };
    paginator: Paginator;
};

const initialState: VouchersState = {
    ids: [],
    entities: {},
    paginator: new Paginator
};

export default function (state = initialState, action: Action): VouchersState {
    switch (action.type)
    {
        default:
            return state;
    }
}
