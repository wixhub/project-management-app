import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  open$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  open() {
    this.open$.next(true);
  }

  close() {
    this.open$.next(false);
  }

  toggle() {
    this.open$.next(!this.open$.value);
  }
}
