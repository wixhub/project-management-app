import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private postfix = 'P◦M◦App';

  constructor(private title: Title) {}

  setTitle(title: string) {
    this.title.setTitle(`${title} | ${this.postfix}`);
  }
}
