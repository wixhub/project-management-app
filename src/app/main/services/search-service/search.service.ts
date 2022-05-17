import { Injectable } from '@angular/core';
import { DatabaseService } from '../../../api/services/database/database.service';
import { map, mergeMap, reduce, switchMap } from 'rxjs/operators';
import { IBoard, IBoardComplete, IError } from '../../../api/models/APISchemas';
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
}
