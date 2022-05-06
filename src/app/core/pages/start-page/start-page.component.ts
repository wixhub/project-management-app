import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
})
export class StartPageComponent implements OnInit {
  constructor(private title: TitleService) {}
  ngOnInit() {
    this.title.setTitle('Start');
    this.title.setHeaderTitle('SiteTitle');
  }
}
