import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const user = this.authService.userValue;
    // if (user) {
    //     // logged in so return true
    //     return true;
    // } else {
    //     // not logged in so redirect to login page with the return url
    //     this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
    //     return false;
    // }
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const user = this.authService.userValue;
    // if (user) {
    //     // logged in so return true
    //     return true;
    // } else {
    //     // not logged in so redirect to login page with the return url
    //     this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
    //     return false;
    // }
    return false;
  }
}
