/**
 * Instead of importing lots of angular material modules into the main module,
 * we use this module to manage the importing angular material modules instead.
 */

import { NgModule } from '@angular/core';

import {
    MatTabsModule,
    MatListModule,
    MatChipsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSidenavModule,
    MatSelectModule,
    MatSnackBarModule,
    MatExpansionModule,
} from '@angular/material';

export const MODULES = [
    MatTabsModule,
    MatListModule,
    MatChipsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSidenavModule,
    MatSelectModule,
    MatSnackBarModule,
    MatExpansionModule,
];

@NgModule({
    imports: MODULES,
    exports: MODULES
})
export class MaterialModule { }
