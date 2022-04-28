import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { environment } from 'src/environments/environment';
import { catchError, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router,
    ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to the api url
    // const user = this.authService.userValue;
    // const isLoggedIn = user && user.token;
    // const isApiUrl = request.url.startsWith(environment.apiUrl);
    // if (user && isLoggedIn && isApiUrl ) {
    //     request = request.clone({
    //         setHeaders: { Authorization: `Bearer ${user.token}` }
    //     });
    // }

    // return next.handle(request);

      if(!/.*\/api\/token\/.*/.test(request.url) ) {
        return this.authService.getAccessToken().pipe(
          mergeMap((accessToken: string) => {
            const reqAuth = request.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } });
            return next.handle(reqAuth);
          }),
          catchError((err) => {
            // console.error(err);
            // this.router.navigate(['/login']);
            this.router.navigate(['/account/login']);
            return throwError(err);
          })
        );
      } else {
        return next.handle(request);
      }
  }
}
