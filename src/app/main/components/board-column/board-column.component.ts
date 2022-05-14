import { DatabaseService } from './../../../api/services/database/database.service';
import { IColumn, ITask } from './../../../api/models/APISchemas';
import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss'],
})
export class BoardColumnComponent implements OnInit {
  @Input() column!: IColumn;
  @Input() boardId!: string;
  public boardCardArr$!: Observable<ITask[]>;
  constructor(private databaseService: DatabaseService) {}
  ngOnInit(): void {
    this.boardCardArr$ = this.databaseService
      .getTasks(this.boardId, this.column.id)
      .pipe(
        map((data) => {
          if (Array.isArray(data)) {
            return data;
          }
          return [];
        })
      );
  }
  onClickCreateCard() {
    // this.databaseService.createTask().subscribe();
  }
}
