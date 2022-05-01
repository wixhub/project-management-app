import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
})
export class ErrorPageComponent implements OnInit {
  constructor(private title: TitleService) {}
  ngOnInit() {
    this.title.setTitle('Error');
    this.title.setHeaderTitle('ErrorPage');
  }
}
