import { Routes, RouterModule } from '@angular/router';

import { EditorGuard }    from '../../guard';
import { DealsEditGuard } from './guard';
import { DealsPage }      from './deals.page';

export const routes: Routes = [
    { path: 'deal', canActivate: [EditorGuard], component: DealsPage, canDeactivate: [DealsEditGuard] }
];

export const routing = RouterModule.forChild(routes);
