import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  ITask,
  TTaskInfo,
  TTaskInfoExtended,
} from 'src/app/api/models/APISchemas';
import { DatabaseService } from 'src/app/api/services/database/database.service';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from 'src/app/core/components/confirm-dialog/confirm-dialog.component';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
})
export class BoardCardComponent implements OnInit {
  @Input() public card!: ITask;
  @Output() public edited = new EventEmitter<any>();
  @Output() public removed = new EventEmitter<any>();

  constructor(private dialog: MatDialog, private database: DatabaseService) {}

  ngOnInit(): void {}

  editCard() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      dialogTitle: 'EditTask',
      formTitle: this.card.title,
      formDescription: this.card.description,
    };

    const dialogRef = this.dialog.open(TaskDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        const newTask: TTaskInfoExtended = {
          title: data.title,
          order: this.card.order,
          description: data.description,
          userId: this.card.userId,
          boardId: this.card.boardId,
          columnId: this.card.columnId,
        };
        this.database
          .updateTask(
            this.card.boardId,
            this.card.columnId,
            this.card.id,
            newTask
          )
          .subscribe(() => this.edited.emit());
      }
    });
  }

  deleteCard() {
    const dialogData = new ConfirmDialogModel(
      'Delete-title',
      `Delete-board`,
      'Delete'
    );

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '600px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.database
          .deleteTask(this.card.boardId, this.card.columnId, this.card.id)
          .subscribe((result) => {
            if (result === null) {
              this.removed.emit();
            }
          });
      }
    });
  }
}
