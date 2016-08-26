import { Routes, RouterModule } from '@angular/router';

import { EditorGuard }  from '../auth';
import { DealsPage }    from './deals.page';

export const routes: Routes = [
    { path: 'deal', canActivate: [EditorGuard], component: DealsPage }
];

export const routing = RouterModule.forChild(routes);
