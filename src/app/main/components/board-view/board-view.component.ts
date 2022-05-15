import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IBoard, IColumn, ITask } from './../../../api/models/APISchemas';
import { DatabaseService } from './../../../api/services/database/database.service';
import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CreateColumnDialogComponent } from '../create-column-dialog/create-column-dialog.component';

@Component({
  selector: 'app-board-view',
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.scss'],
})
export class BoardViewComponent implements OnInit {
  @Input() boardId!: string;
  boardName!: string;
  public boardColumnArr$!: Observable<IColumn[]>;
  constructor(
    private databaseService: DatabaseService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.databaseService
      .getBoards()
      .subscribe((data: any) => (this.boardName = this.getBoardName(data)));
    this.boardColumnArr$ = this.databaseService.getColumns(this.boardId).pipe(
      map((data) => {
        if (Array.isArray(data)) {
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
      this.databaseService.createColumn(this.boardId, data);
    });
  }
}
