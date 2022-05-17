import { Injectable } from '@angular/core';
import { DatabaseService } from '../../../api/services/database/database.service';
import { map, mergeMap, reduce, switchMap } from 'rxjs/operators';
import {
  IBoard,
  IBoardComplete,
  IColumnComplete,
  IError,
  ITask,
} from '../../../api/models/APISchemas';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private api: DatabaseService) {}

  getCompleteBoardsData() {
    return this.api.getBoards().pipe(
      map<IError | IBoard[], string[]>((boardsArray: IError | IBoard[]) => {
        return Array.isArray(boardsArray)
          ? boardsArray.reduce(
              (acc: string[], board: IBoard) => acc.concat(board.id),
              []
            )
          : [];
      }),
      switchMap<string[], Observable<string>>((boardsIds: string[]) => {
        return from(boardsIds);
      }),
      mergeMap<string, Observable<IError | IBoardComplete>>((id: string) => {
        return this.api.getBoard(id);
      }),
      reduce<IError | IBoardComplete, IBoardComplete[]>(
        (acc: Array<IBoardComplete>, board: IBoardComplete | IError) => {
          return 'id' in board ? acc.concat(board) : acc;
        },
        []
      )
    );
  }

  searchInBoards(key: string, data: IBoardComplete[]): ISearchResults[] {
    const results: ISearchResults[] = [];
    data.forEach((board: IBoardComplete) => {
      board.columns?.forEach((column: IColumnComplete) => {
        column.tasks?.forEach((task: ITask) => {
          if (task.title.includes(key) || task.description.includes(key)) {
            results.push({
              boardId: board.id,
              boardName: board.title,
              columnName: column.title,
              taskName: task.title,
            });
          }
        });
      });
    });
    return results;
  }
}

interface ISearchResults {
  boardId: string;
  boardName: string;
  columnName: string;
  taskName: string;
}
