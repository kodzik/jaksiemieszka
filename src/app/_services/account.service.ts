import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private userSubject: BehaviorSubject<User>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username: any, password: any) {
    // return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, { username, password })
    //     .pipe(map(user => {
    //         // store user details and jwt token in local storage to keep user logged in between page refreshes
    //         localStorage.setItem('user', JSON.stringify(user));
    //         this.userSubject.next(user);
    //         return user;
    //     }));
  }
}
