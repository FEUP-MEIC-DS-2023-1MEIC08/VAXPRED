import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('http://localhost:8000/users/');
  }

  getUser(id: number) {
    return this.http.get('http://localhost:8000/users/' + id + '/');
  }
}
