import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
    this.dialogRef.close(this.form.get('title')?.value);
  }

  close() {
    this.dialogRef.close();
  }
}
