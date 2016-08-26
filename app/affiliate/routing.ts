import { Routes, RouterModule } from '@angular/router';

import { ShopMgrGuard }     from '../auth';
import { HomePage }         from './home.page';

export const routes: Routes = [
    { path: 'affiliate', canActivate: [ShopMgrGuard], component: HomePage }
];

export const routing = RouterModule.forChild(routes);
