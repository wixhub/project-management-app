import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
})
export class TaskDialogComponent implements OnInit {
  form!: FormGroup;
  dialogTitle: string;
  formTitle: string;
  formDescription: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.dialogTitle = data.dialogTitle;
    this.formTitle = data.formTitle;
    this.formDescription = data.formDescription;
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: [this.formTitle, [Validators.required]],
      description: [this.formDescription, [Validators.required]],
    });
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
