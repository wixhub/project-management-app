import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private postfix = 'PMApp';
  pageTitle = new BehaviorSubject('Start');

  constructor(private title: Title) {}

  setTitle(title: string) {
    this.title.setTitle(`${title} | ${this.postfix}`);
  }
}
