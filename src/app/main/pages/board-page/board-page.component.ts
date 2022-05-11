import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/core/services/title.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  public boardId!: number;
  constructor(private title: TitleService, route: ActivatedRoute) {
    route.params.subscribe((params) => {
      this.boardId = parseInt(params['id']);
    });
  }

  ngOnInit() {
    this.title.setTitle('Board');
    this.title.setHeaderTitle('BoardPage');
  }
}
