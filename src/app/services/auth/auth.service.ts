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

  isLoggedIn(): Promise<boolean> {
    return this.token.isTokenExist();
  }

  async logout(): Promise<void> {
    try {
      await this.token.removeToken();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error(error);
    }
  }
}
