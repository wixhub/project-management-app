import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  IBoard,
  IBoardComplete,
  IColumn,
  IColumnComplete,
  IError,
  ITask,
  ITokenResponse,
  IUser,
  IUserCredentials,
  TBoardTitle,
  TColumnInfo,
  TTaskInfo,
  TTaskInfoExtended,
  TUserSignIn,
} from '../../models/APISchemas';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private http: HttpClient) {}

  signUp(credentials: IUserCredentials) {
    return this.http.post<IError | IUser>('api/signup', credentials);
  }

  signIn(loginInfo: TUserSignIn) {
    return this.http.post<IError | ITokenResponse>('api/signin', loginInfo);
  }

  getUsers() {
    return this.http.get<IError | IUser[]>('api/users');
  }

  getUser(id: string) {
    return this.http.get<IError | IUser>(`api/users/${id}`);
  }

  deleteUser(id: string) {
    return this.http.delete<IError | null>(`api/users/${id}`);
  }

  updateUser(id: string, credentials: IUserCredentials) {
    return this.http.put<IError | IUser>(`api/users/${id}`, credentials);
  }

  getBoards() {
    return this.http.get<IError | IBoard[]>('api/boards');
  }

  createBoard(title: string) {
    return this.http.post<IError | IBoard>('api/boards', { title: title });
  }

  getBoard(id: string) {
    return this.http.get<IError | IBoardComplete>(`api/boards/${id}`);
  }

  deleteBoard(id: string) {
    return this.http.delete<IError | null>(`api/boards/${id}`);
  }

  updateBoard(id: string, boardTitle: TBoardTitle) {
    return this.http.put<IError | IBoard>(`api/boards/${id}`, boardTitle);
  }

  getColumns(boardId: string) {
    return this.http.get<IError | IColumn[]>(`api/boards/${boardId}/columns`);
  }

  createColumn(boardId: string, columnInfo: TColumnInfo) {
    return this.http.post<IError | IColumn>(
      `api/boards/${boardId}/columns`,
      columnInfo
    );
  }

  getColumn(boardId: string, columnId: string) {
    return this.http.get<IError | IColumnComplete>(
      `api/boards/${boardId}/columns/${columnId}`
    );
  }

  deleteColumn(boardId: string, columnId: string) {
    return this.http.delete<IError | null>(
      `api/boards/${boardId}/columns/${columnId}`
    );
  }

  updateColumn(boardId: string, columnId: string, columnInfo: TColumnInfo) {
    return this.http.put<IError | IColumn>(
      `api/boards/${boardId}/columns/${columnId}`,
      columnInfo
    );
  }

  getTasks(boardId: string, columnId: string) {
    return this.http.get<IError | ITask[]>(
      `api/boards/${boardId}/columns/${columnId}/tasks`
    );
  }

  createTask(boardId: string, columnId: string, taskInfo: TTaskInfo) {
    return this.http.post<IError | ITask>(
      `api/boards/${boardId}/columns/${columnId}/tasks`,
      taskInfo
    );
  }

  getTask(boardId: string, columnId: string, taskId: string) {
    return this.http.get<IError | ITask>(
      `api/boards/${boardId}/columns/${columnId}/tasks/${taskId}`
    );
  }

  deleteTask(boardId: string, columnId: string, taskId: string) {
    return this.http.delete<IError | null>(
      `api/boards/${boardId}/columns/${columnId}/tasks/${taskId}`
    );
  }

  updateTask(
    boardId: string,
    columnId: string,
    taskId: string,
    taskInfo: TTaskInfoExtended
  ) {
    return this.http.put<IError | ITask>(
      `api/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      taskInfo
    );
  }
}
