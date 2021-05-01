import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private token: TokenService,
    private router: Router,
  ) { }

  isLoggedIn(): boolean {
    return this.token.isTokenExist();
  }

  logout(): any {
    this.router.navigate(['/login']);
    return this.token.removeToken();
  }
}
