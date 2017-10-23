/**
 * Edit, delete or create a taxonomy
 */
import { Component, Inject } from '@angular/core';
import { Input, Output }     from '@angular/core';
import { EventEmitter }      from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { Category }          from "../../models";
import { Channel }           from "../../models";

@Component({
    selector: 'modal-edit-tax',
    templateUrl: './modal-edit-tax.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalEditTax
{
    constructor(public dialogRef: MatDialogRef<ModalEditTax>,
                @Inject(MAT_DIALOG_DATA) public data: any) {}
}
