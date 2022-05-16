import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { IBoard } from './../../../api/models/APISchemas';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from 'src/app/core/components/confirm-dialog/confirm-dialog.component';
import { DatabaseService } from 'src/app/api/services/database/database.service';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent {
  @Input() public item!: IBoard;
  @Output() public removed = new EventEmitter<any>();

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private database: DatabaseService
  ) {}

  onClickOpenBoard() {
    this.router.navigate(['main', this.item.id]);
  }

  deleteBoard() {
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
        this.database.deleteBoard(this.item.id).subscribe((result) => {
          if (result === null) {
            this.removed.emit();
          }
        });
      }
    });
  }
}
