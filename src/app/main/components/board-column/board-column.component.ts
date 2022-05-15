import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DatabaseService } from './../../../api/services/database/database.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { IColumn, ITask, TTaskInfo } from './../../../api/models/APISchemas';
import { AuthenticationService } from 'src/app/auth/services/authentication/authentication.service';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from 'src/app/core/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss'],
})
export class BoardColumnComponent implements OnInit {
  @Input() column!: IColumn;
  @Input() boardId!: string;
  @Output() public removed = new EventEmitter<any>();
  public boardCardArr$!: Observable<ITask[]>;
  tasksCount: number = 0;

  constructor(
    private database: DatabaseService,
    private dialog: MatDialog,
    private auth: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.boardCardArr$ = this.database
      .getTasks(this.boardId, this.column.id)
      .pipe(
        map((data) => {
          if (Array.isArray(data)) {
            this.tasksCount = data.length;
            return data;
          }
          return [];
        })
      );
  }

  onClickCreateCard() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      dialogTitle: 'AddTask',
    };

    const dialogRef = this.dialog.open(TaskDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        const newTask: TTaskInfo = {
          title: data.title,
          order: this.tasksCount + 1,
          description: data.description,
          userId: this.auth.userId,
        };
        this.database
          .createTask(this.boardId, this.column.id, newTask)
          .subscribe(() => this.getList());
      }
    });
  }

  deleteColumn() {
    const dialogData = new ConfirmDialogModel(
      'Delete-title',
      `Delete-task`,
      'Delete'
    );

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '600px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.database
          .deleteColumn(this.boardId, this.column.id)
          .subscribe((result) => {
            if (result === null) {
              this.removed.emit();
            }
          });
      }
    });
  }

  refresh() {
    this.getList();
  }
}
