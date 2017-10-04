import { Routes, RouterModule } from '@angular/router';

import { EditorGuard } from '../../guard';
import { CommentsPage } from './comments.page';

const routes: Routes = [
    {
        path: 'comment',
        canActivate: [EditorGuard],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'page/1/status/all'},
            { path: 'page/:page',          redirectTo: 'page/:page/status/all' },
            { path: 'page/:page/status/:status', component: CommentsPage },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
