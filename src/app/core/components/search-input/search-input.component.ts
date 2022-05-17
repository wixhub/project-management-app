import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { SearchService } from '../../services/search-service/search.service';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IBoardComplete } from '../../../api/models/APISchemas';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements AfterViewInit {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor(private search: SearchService) {}

  ngAfterViewInit(): void {
    let data: IBoardComplete[] = [];
    fromEvent(this.searchInput.nativeElement, 'focus')
      .pipe(
        switchMap(() => {
          return this.search.getCompleteBoardsData();
        })
      )
      .subscribe((response) => (data = response));
    fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        debounceTime(1500),
        map<Event, string>(
          (event: Event) => (event.target! as HTMLInputElement).value
        ),
        filter((searchValue) => searchValue.length >= 3),
        distinctUntilChanged(),
        map((searchKey) => {
          return this.search.searchInBoards(searchKey, data);
        })
      )
      .subscribe((x) => console.log(x));
  }
}
