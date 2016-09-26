import { Routes, RouterModule } from '@angular/router';

import { CommentsPage } from '../comment/comments.page';

const routes: Routes = [
    {
        path: 'comment',
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'page/1/state/all'},
            { path: 'page/:page',          redirectTo: 'page/:page/state/all' },
            { path: 'page/:page/state/:state', component: CommentsPage },
        ]
    }
];

export const routing = RouterModule.forChild(routes);