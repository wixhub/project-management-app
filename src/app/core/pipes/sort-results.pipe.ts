import { Pipe, PipeTransform } from '@angular/core';
import { ISearchResults } from '../services/search-service/search.service';

@Pipe({
  name: 'sortResults',
})
export class SortResultsPipe implements PipeTransform {
  transform(results: ISearchResults[]): ISearchResults[] {
    return results.sort((a, b) => a.boardName.localeCompare(b.boardName));
  }
}
