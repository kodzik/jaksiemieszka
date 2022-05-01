import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

class LoginResponse {
  access: string;
  refresh: string;
}

class RefreshResponse {
  access: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwt: JwtHelperService = new JwtHelperService();
  private userSubject: BehaviorSubject<boolean> = new BehaviorSubject(this.isAuthenticated());
  public user: Observable<boolean>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): boolean {
    return this.userSubject.value;
  }

  // User is logged in
  isAuthenticated(): boolean {
    const refresh = localStorage.getItem('refresh')
    if(refresh !== null){
      return localStorage.getItem('username') !== null && !this.jwt.isTokenExpired(refresh);
    } else{
      return false;
    }
  }

  // Log user in and get refresh/access tokens
  authenticate(username: string, password: string) {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/api/token/`, { username: username, password: password })
      .pipe(
        mergeMap(response => {
          // store JWTs
          localStorage.setItem('access', response.access);
          localStorage.setItem('refresh', response.refresh);
          // now get user info
          const opts = {
            headers: new HttpHeaders({
              'Authorization': 'Bearer ' + localStorage.getItem('access')  // tslint:disable-line:object-literal-key-quotes
            })
          };
          return this.http.get<any>(`${environment.apiUrl}/api/user/`, opts).pipe(
            map(userInfo => {
              localStorage.setItem('username', userInfo.user.username);
              this.userSubject.next(userInfo);
            })
          );
        }),
        catchError(this.errorHandler)
      );
  }

  // Get access token, automatically refresh if necessary
  getAccessToken(): Observable<string> {
    const access = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');

    if(access !== null && refresh !== null){

      if (!this.jwt.isTokenExpired(access)) {
        return new BehaviorSubject(access);
      } else if (!this.jwt.isTokenExpired(refresh)) {
        console.log('refreshing access token');
        const opts = {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + refresh
          })
        };
        return this.http.post<RefreshResponse>(`${environment.apiUrl}/api/token/refresh/`, { refresh: refresh }, { withCredentials: true }).pipe(
          map(response => {
            localStorage.setItem('access', response.access);
            return response.access;
          })
        );
      } else {
        return throwError('refresh token is expired');
      }
    } else {
      return throwError('refresh token is expired');
    }
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

  register(username: string, password: string){
    return this.http.post(`${environment.apiUrl}/api/users/`, { username: username, password: password })
    .pipe(
      map(userInfo => {
        return userInfo
      }),
      catchError(this.errorHandler)
    )
    // .subscribe(response => {
    //   console.log("login response: ", response);
    // })
  }

}

  // refreshToken() {
  //   const access = localStorage.getItem('access');

  //   const opts = {
  //     headers: new HttpHeaders({
  //       Authorization: 'Bearer ' + access
  //     })
  //   };
  //   const headers = { 'Authorization': 'Bearer '};
  //   return this.http.post<any>(`${environment.apiUrl}/api/token/refresh/`, { refresh: localStorage.getItem('access') },  { withCredentials: true })
  //       .pipe(map((user) => {
  //           this.userSubject.next(user);
  //           this.startRefreshTokenTimer();
  //           return user;
  //       }));
  // }


  // private refreshTokenTimeout: any;

  // private startRefreshTokenTimer() {
  //     let jwtToken = localStorage.getItem('access');
  //     // parse json object from base64 encoded jwt token
  //     if( this.userValue !== null && jwtToken !== null){
  //       jwtToken = JSON.parse(atob(jwtToken.split('.')[1]));
  //       // const expires = new Date(jwtToken.exp * 1000);
  //       // set a timeout to refresh the token a minute before it expires
  //       // const timeout = expires.getTime() - Date.now() - (60 * 1000);
  //       // this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  //     }
  // }
  // private stopRefreshTokenTimer() {
  //     clearTimeout(this.refreshTokenTimeout);
  // }

    // User is logged in
    // isAuthenticated(): boolean {
    //   return sessionStorage.getItem('username') !== null &&
    //         //  sessionStorage.getItem('enabled') === 'true' &&
    //          !this.jwt.isTokenExpired(sessionStorage.getItem('refreshToken'));
    // }

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
