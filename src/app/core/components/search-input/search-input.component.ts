import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  ISearchResults,
  SearchService,
} from '../../services/search-service/search.service';
import {
  debounceTime,
  filter,
  fromEvent,
  map,
  merge,
  combineLatestWith,
  tap,
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

  isFocused: boolean = false;

  isHovered: boolean = false;

  private readonly defaultValue: ISearchResults;

  results: ISearchResults[];

  constructor(private search: SearchService) {
    this.defaultValue = {
      boardId: '',
      boardName: '',
      columnName: '',
      taskName: 'No data found',
      taskDesc: '',
    };
    this.results = [this.defaultValue];
  }

  ngAfterViewInit(): void {
    const inputEvent$ = fromEvent<KeyboardEvent>(
      this.searchInput.nativeElement,
      'input'
    ).pipe(debounceTime(1500));
    const enterEvent$ = fromEvent<KeyboardEvent>(
      this.searchInput.nativeElement,
      'keyup'
    ).pipe(filter((event: KeyboardEvent) => event.code === 'Enter'));
    const data$ = fromEvent(this.searchInput.nativeElement, 'beforeinput').pipe(
      debounceTime(1000),
      tap(() => {
        if (this.searchInput.nativeElement.value.length < 3) {
          this.results = [this.defaultValue];
        }
      }),
      switchMap(() => {
        return this.search.getCompleteBoardsData();
      })
    );
    merge(inputEvent$, enterEvent$)
      .pipe(
        map<KeyboardEvent, string>(() => this.searchInput.nativeElement.value),
        filter<string>((searchValue: string) => searchValue.length >= 3),
        combineLatestWith<string, [IBoardComplete[]]>(data$),
        map<[string, IBoardComplete[]], ISearchResults[]>(
          ([searchValue, data]) => this.search.searchInBoards(searchValue, data)
        )
      )
      .subscribe((results) => {
        results.length === 0
          ? (this.results = [this.defaultValue])
          : (this.results = results);
      });
  }

  onFocus() {
    this.isFocused = true;
  }

  onBlur() {
    this.isFocused = false;
  }

  onHover() {
    this.isHovered = true;
  }

  onLeave() {
    this.isHovered = false;
  }

  onSearch() {
    if (this.searchInput.nativeElement.value.length === 0) {
      this.results = [this.defaultValue];
    }
  }
}
