import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
})
export class StartPageComponent implements OnInit {
  constructor(private title: TitleService, public translate: TranslateService) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
  }
  ngOnInit() {
    this.title.setTitle('Start');
    this.title.setHeaderTitle('SiteTitle');
  }
}
