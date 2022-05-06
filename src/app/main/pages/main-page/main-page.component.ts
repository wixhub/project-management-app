import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/core/services/title.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  public boardList = [];
  constructor(private title: TitleService) {}
  ngOnInit() {
    this.title.setTitle('Boards');
    this.title.setHeaderTitle('MainPage');
  }
}
