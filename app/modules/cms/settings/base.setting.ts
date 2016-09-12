/**
 * This is the base class for all cms settings
 */
import { OnInit }           from '@angular/core';
import { ActivatedRoute }   from '@angular/router';
import { Store }            from '@ngrx/store';

import { AppState }          from '../../../reducers';

export class BaseSetting implements OnInit
{
    subParams: any;
    
    activeChannel: string;
    
    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) {}
    
    ngOnInit() {
        this.subParams = this.route.params.subscribe(params => {
            this.activeChannel = params['channel'];
            // We need to reload sth into cmsattr?
            //this.store.dispatch();
        });
    }
}
