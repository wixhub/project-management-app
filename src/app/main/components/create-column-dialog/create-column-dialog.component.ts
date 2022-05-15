import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TColumnInfo } from '../../../api/models/APISchemas';

@Component({
  selector: 'app-create-column-dialog',
  templateUrl: './create-column-dialog.component.html',
  styleUrls: ['./create-column-dialog.component.scss'],
})
export class CreateColumnDialogComponent implements OnInit {
  form!: FormGroup;
  dialogTitle: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateColumnDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.dialogTitle = data.dialogTitle;
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', []],
    });
  }

  save() {
    const title = this.form.get('title')?.value;
    const newColumn: TColumnInfo = { title: title, order: 0 };
    this.dialogRef.close(newColumn);
  }

  close() {
    this.dialogRef.close();
  }
}
