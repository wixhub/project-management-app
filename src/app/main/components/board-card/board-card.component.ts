import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ITask } from 'src/app/api/models/APISchemas';
import { DatabaseService } from 'src/app/api/services/database/database.service';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from 'src/app/core/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
})
export class BoardCardComponent implements OnInit {
  @Input() public card!: ITask;
  @Output() public removed = new EventEmitter<any>();

  constructor(private dialog: MatDialog, private database: DatabaseService) {}

  ngOnInit(): void {}

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
