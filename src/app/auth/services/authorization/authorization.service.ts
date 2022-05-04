import { Injectable } from '@angular/core';
import { DatabaseService } from '../../../api/services/database/database.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private database: DatabaseService) {}

  get token(): string {
    let key = '';
    if (localStorage.getItem('authToken')) {
      key = localStorage.getItem('authToken') as string;
    }
    return key;
  }
}
