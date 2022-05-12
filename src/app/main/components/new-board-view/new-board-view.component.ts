import { DatabaseService } from './../../../api/services/database/database.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-board-view',
  templateUrl: './new-board-view.component.html',
  styleUrls: ['./new-board-view.component.scss'],
})
export class NewBoardViewComponent implements OnInit {
  constructor(
    private databaseService: DatabaseService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onClickCreateBoard(event: Event, boardName: string) {
    event.preventDefault();
    if (boardName) {
      this.databaseService.createBoard(boardName);
      this.router.navigate(['main']);
    }
  }
}
