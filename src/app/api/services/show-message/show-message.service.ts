import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShowMessageService {
  private message$: Subject<string>;

  constructor() {
    this.message$ = new Subject();
  }

  showMessage(message: string) {
    this.message$.next(message);
  }

  get messageObservable$() {
    return this.message$.asObservable();
  }
}
