import { Routes, RouterModule } from '@angular/router';

import { ShopMgrGuard }     from '../../guard';
import { HomePage }         from './home.page';

export const routes: Routes = [
    { path: 'analysis', canActivate: [ShopMgrGuard], component: HomePage }
];

export const routing = RouterModule.forChild(routes);
