import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/api/services/database/database.service';
import { TitleService } from 'src/app/core/services/title.service';

@Component({
  selector: 'app-new-board-page',
  templateUrl: './new-board-page.component.html',
  styleUrls: ['./new-board-page.component.scss'],
})
export class NewBoardPageComponent implements OnInit {
  constructor(
    private title: TitleService,
    private router: Router,
    private database: DatabaseService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('New Board');
    this.title.setHeaderTitle('NewBoardPage');
  }

  toNewBoard() {
    this.database.getBoards().subscribe((data) => {
      if (Array.isArray(data)) {
        this.router.navigate([`/main`, data[data.length - 1].id]);
      }
    });
  }
}
