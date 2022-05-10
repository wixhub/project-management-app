export interface IUser {
  id: string;
  name: string;
  login: string;
}

export interface IUserCredentials {
  name: string;
  login: string;
  password: string;
}

export type TUserSignIn = Omit<IUserCredentials, 'name'>;

export interface IBoard {
  id: string;
  title: string;
}

export type TBoardTitle = Omit<IBoard, 'id'>;

export interface IBoardComplete extends IBoard {
  columns: IColumnComplete[];
}

export interface IColumn {
  id: string;
  title: string;
  order: number;
}

export type TColumnInfo = Omit<IColumn, 'id'>;

export interface IColumnComplete extends IColumn {
  tasks: ITask[];
}

export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

export type TTaskInfoExtended = Omit<ITask, 'id'>;

export type TTaskInfo = Omit<TTaskInfoExtended, 'boardId' | 'columnId'>;

export interface IError {
  statusCode: number;
  message: string;
}

export interface ITokenResponse {
  token: string;
}
