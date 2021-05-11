import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authServe: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isLoggedIn = this.authServe.isLoggedIn();
    const loginPage = route.routeConfig?.path === 'login';

    if (isLoggedIn && ['login', 'signup'].some(x => route.routeConfig?.path === x)) {
      this.router.navigate(['/students']);
      return false;
    }

    if (!isLoggedIn && !['login', 'signup'].some(x => route.routeConfig?.path === x)) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;

  }
}
