import { Injectable, OnInit } from '@angular/core';
import { DatabaseService } from '../../../api/services/database/database.service';
import { Router } from '@angular/router';
import {
  IError,
  ITokenResponse,
  IUserCredentials,
  TUserSignIn,
} from '../../../api/models/APISchemas';
import { LocalStorageKeys } from '../../models/localStorageKeys';
import { Observable, Subject } from 'rxjs';
import { ITokenInfo } from '../../models/token';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService implements OnInit {
  isLogged$: Subject<boolean> = new Subject();

  constructor(private database: DatabaseService, private rout: Router) {}

  ngOnInit(): void {
    if (this.token) {
      this.isLogged$.next(true);
    } else {
      this.isLogged$.next(false);
    }
  }

  getLogStatus(): Observable<boolean> {
    return this.isLogged$.asObservable();
  }

  get token(): string {
    return localStorage.getItem(LocalStorageKeys.authToken) ?? '';
  }

  get userId(): string {
    return localStorage.getItem(LocalStorageKeys.userId) ?? '';
  }

  get userLogin(): string {
    return localStorage.getItem(LocalStorageKeys.login) ?? '';
  }

  get userName(): string {
    let name = '';
    const subs = this.database.getUsers().subscribe((data) => {
      if (Array.isArray(data)) {
        name = data.find((user) => user.id === this.userId)?.name ?? '';
      }
      subs.unsubscribe();
    });
    return name;
  }

  logout() {
    localStorage.removeItem(LocalStorageKeys.authToken);
    localStorage.removeItem(LocalStorageKeys.userId);
    this.isLogged$.next(false);
    this.rout.navigate(['']).then();
  }

  login(userData: TUserSignIn): Observable<IError | ITokenResponse> {
    const signin = this.database.signIn(userData);
    const subs = signin.subscribe((data) => {
      if ('token' in data) {
        localStorage.setItem(LocalStorageKeys.authToken, data.token);
        const [id, login] = [...this.decodeToken(data.token)];
        localStorage.setItem(LocalStorageKeys.userId, id);
        localStorage.setItem(LocalStorageKeys.login, login);
        this.isLogged$.next(true);
        subs.unsubscribe();
      }
    });
    return signin;
  }

  decodeToken(token: string): string[] {
    let id = '';
    let login = '';
    try {
      const tokenInfo: ITokenInfo = JSON.parse(atob(token.split('.')[1]));
      id = tokenInfo.userId;
      login = tokenInfo.login;
    } catch (e) {
      console.log(e);
    }
    return [id, login];
  }

  signup(credentials: IUserCredentials) {
    const subs = this.database.signUp(credentials).subscribe(() => {
      subs.unsubscribe();
    });
  }
}
