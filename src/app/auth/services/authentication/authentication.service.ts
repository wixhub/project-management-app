import { Injectable } from '@angular/core';
import { DatabaseService } from '../../../api/services/database/database.service';
import { Router } from '@angular/router';
import {
  IError,
  ITokenResponse,
  IUserCredentials,
  TUserSignIn,
} from '../../../api/models/APISchemas';
import { LocalStorageKeys } from '../../models/localStorageKeys';
import { Observable } from 'rxjs';
import { ITokenInfo } from '../../models/token';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private database: DatabaseService, private rout: Router) {}

  get token(): string {
    let key = '';
    if (localStorage.getItem(LocalStorageKeys.authToken)) {
      key = localStorage.getItem(LocalStorageKeys.authToken) as string;
    }
    return key;
  }

  logout() {
    localStorage.removeItem(LocalStorageKeys.authToken);
    localStorage.removeItem(LocalStorageKeys.userId);
    this.rout.navigate(['']).then();
  }

  login(userData: TUserSignIn): Observable<IError | ITokenResponse> {
    const signin = this.database.signIn(userData);
    const subs = signin.subscribe((data) => {
      if ('token' in data) {
        localStorage.setItem(LocalStorageKeys.authToken, data.token);
        const id = this.decodeToken(data.token);
        localStorage.setItem(LocalStorageKeys.userId, id);
        subs.unsubscribe();
      }
    });
    return signin;
  }

  decodeToken(token: string) {
    let id = '';
    try {
      const tokenInfo: ITokenInfo = JSON.parse(atob(token.split('.')[1]));
      id = tokenInfo.userId;
    } catch (e) {
      console.log(e);
    }
    return id;
  }

  signup(credentials: IUserCredentials) {
    const subs = this.database.signUp(credentials).subscribe(() => {
      subs.unsubscribe();
    });
  }
}
