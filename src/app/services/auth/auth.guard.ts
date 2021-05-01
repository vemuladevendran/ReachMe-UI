import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
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
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree  {

    const isLoggedIn = this.authServe.isLoggedIn();

    if (!isLoggedIn) {
      console.log(isLoggedIn);
      return true;
    }

    if (isLoggedIn) {
      console.log(isLoggedIn);
      this.router.navigate(['/signup']);
      return false;
    }
    return true;
  }
}
