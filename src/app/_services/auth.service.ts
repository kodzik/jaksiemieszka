import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

class LoginResponse {
  accessToken: string;
  refreshToken: string;
}

class RefreshResponse {
  accessToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { 
    this.userSubject = new BehaviorSubject<User | null>(null);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User | null {
    return this.userSubject.value;
  }

  // Log user in and get refresh/access tokens
  authenticate(username: string, password: string) {

    return this.http.post<LoginResponse>(`${environment.apiUrl}/users/authenticate`, { username, password })
      .pipe(
        mergeMap(response => {
          // store JWTs
          sessionStorage.setItem('accessToken', response.accessToken);
          sessionStorage.setItem('refreshToken', response.refreshToken);

          // now get user info
          const opts = {
            headers: new HttpHeaders({
              'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')  // tslint:disable-line:object-literal-key-quotes
            })
          };
          return this.http.get<UserInfo>(this.config.API.auth.info, opts).pipe(
            map(userInfo => {
              sessionStorage.setItem('username', userInfo.username);
              sessionStorage.setItem('enabled', String(userInfo.enabled));
              sessionStorage.setItem('isAdmin', String(userInfo.isAdmin));
              sessionStorage.setItem('elmiSU', String(userInfo.elmiSU));
              this.authStatus.next(true);
            })
          );
        }),
        catchError(this.errorHandler)
      );
  }

    // User is logged in
    isAuthenticated(): boolean {
      return sessionStorage.getItem('username') !== null &&
             sessionStorage.getItem('enabled') === 'true' &&
             !this.jwt.isTokenExpired(sessionStorage.getItem('refreshToken'));
    }

  // login(username: string, password: string) {
  //   // return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password }, { withCredentials: true })
  //   return this.http.post<any>(`${environment.apiUrl}/api/token/`, { username, password }, { withCredentials: true })
  //       .pipe(map(user => {
  //           this.userSubject.next(user);
  //           this.startRefreshTokenTimer();
  //           return user;
  //       }));
  // }

  // logout() {
  //     this.http.post<any>(`${environment.apiUrl}`, {}, { withCredentials: true }).subscribe();
  //     this.stopRefreshTokenTimer();

  //     //TODO
  //     this.userSubject.next(new User);

  //     this.router.navigate(['/account/login']);
  // }

  refreshToken() {
    return this.http.post<any>(`${environment.apiUrl}/api/token/refresh/`, {}, { withCredentials: true })
        .pipe(map((user) => {
            this.userSubject.next(user);
            this.startRefreshTokenTimer();
            return user;
        }));
  }

  private refreshTokenTimeout: any;

  private startRefreshTokenTimer() {
      // parse json object from base64 encoded jwt token
      if( this.userValue !== null){
        // const jwtToken = JSON.parse(atob(this.userValue.token.split('.')[1]));
        const jwtToken = this.userValue.
        const expires = new Date(jwtToken.exp * 1000);
        // set a timeout to refresh the token a minute before it expires
        const timeout = expires.getTime() - Date.now() - (60 * 1000);
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
      }
  }

  private stopRefreshTokenTimer() {
      clearTimeout(this.refreshTokenTimeout);
  }

  // Handle authentication errors
  private errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(`authentication error: ${error.error.message}`);
    } else {
      console.error(`bad auth response: ${error.status}: ${error.statusText} ${JSON.stringify(error.error)}`);
    }
    return throwError('Nieprawidłowe hasło lub nazwa użytkownika.');
  }
}
