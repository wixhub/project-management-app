import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private postfix = 'P◦M◦App';
  public headerTitle: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private title: Title) {}

  public setTitle(title: string): void {
    this.title.setTitle(`${title} | ${this.postfix}`);
  }

  public setHeaderTitle(parameter: string): void {
    this.headerTitle.next(parameter);
  }
}
