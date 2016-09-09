import { Routes, RouterModule } from '@angular/router';

import { AdminGuard }       from '../../guard';
import { AnalysisPage }     from './analysis.page';
import { CmsAnalysisPage }  from './cms.page';
import { ShopAnalysisPage } from './shop.page';
import { BbsAnalysisPage }  from './bbs.page';

export const routes: Routes = [
    {
        path: 'analysis',
        canActivate: [AdminGuard],
        children: [
            /* Index */
            { path: '',     component: AnalysisPage },
            { path: 'cms',  component: CmsAnalysisPage },
            { path: 'shop', component: ShopAnalysisPage },
            { path: 'bbs',  component: BbsAnalysisPage }
        ]
    }
];

export const routing = RouterModule.forChild(routes);
