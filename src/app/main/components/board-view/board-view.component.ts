import { IColumn, ITask } from './../../../api/models/APISchemas';
import { DatabaseService } from './../../../api/services/database/database.service';
import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-board-view',
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.scss'],
})
export class BoardViewComponent implements OnInit {
  @Input() boardId!: string;
  public boardColumnArr$!: Observable<IColumn[]>;
  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.boardColumnArr$ = this.databaseService.getColumns(this.boardId).pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data;
        }
        return [];
      })
    );
  }
  onClickCreateColumn() {
    // open modal
  }
}
