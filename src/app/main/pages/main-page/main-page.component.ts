import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/core/services/title.service';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/api/services/database/database.service';
import { map, Observable, Subject } from 'rxjs';
import { IBoard } from 'src/app/api/models/APISchemas';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  public boardList$!: Observable<IBoard[]>;
  boardsList!: IBoard[];
  public loading$: Subject<boolean> = new Subject();

  constructor(
    private title: TitleService,
    private router: Router,
    private database: DatabaseService
  ) {}
  ngOnInit() {
    this.title.setTitle('Boards');
    this.title.setHeaderTitle('MainPage');
    this.getList();
  }

  getList() {
    this.boardList$ = this.database.getBoards().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          this.boardsList = data;
          return data;
        }
        return [];
      })
    );
  }

  drop(event: CdkDragDrop<IBoard[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  addNewBoard() {
    this.router.navigate([`main`, `new`]);
  }

  deleteItem() {
    this.getList();
  }
}
