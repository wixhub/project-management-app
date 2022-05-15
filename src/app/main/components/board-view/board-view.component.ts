import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IBoard, IColumn, ITask } from './../../../api/models/APISchemas';
import { DatabaseService } from './../../../api/services/database/database.service';
import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CreateColumnDialogComponent } from '../create-column-dialog/create-column-dialog.component';
import { TColumnInfo } from '../../../api/models/APISchemas';

@Component({
  selector: 'app-board-view',
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.scss'],
})
export class BoardViewComponent implements OnInit {
  @Input() boardId!: string;
  public boardColumnArr$!: Observable<IColumn[]>;
  boardName!: string;
  columnsCount: number = 0;

  constructor(
    private databaseService: DatabaseService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.databaseService
      .getBoards()
      .subscribe((data: any) => (this.boardName = this.getBoardName(data)));
    this.getList();
  }

  getList() {
    this.boardColumnArr$ = this.databaseService.getColumns(this.boardId).pipe(
      map((data) => {
        if (Array.isArray(data)) {
          this.columnsCount = data.length;
          return data;
        }
        return [];
      })
    );
  }

  getBoardName(data: IBoard[]) {
    let index = data.findIndex((obj) => obj.id === this.boardId);
    return data[index].title;
  }

  onClickCreateColumn() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      dialogTitle: 'AddColumn',
    };

    const dialogRef = this.dialog.open(
      CreateColumnDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((data) => {
      const newColumn: TColumnInfo = {
        title: data,
        order: this.columnsCount + 1,
      };
      this.databaseService
        .createColumn(this.boardId, newColumn)
        .subscribe(() => this.getList());
    });
  }

  deleteItem() {
    this.getList();
  }
}
