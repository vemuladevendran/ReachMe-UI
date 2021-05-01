import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenKey = 'AUTH_TOKEN';

  constructor() { }

  saveToken(data: any): any{
    localStorage.setItem(this.tokenKey, data);
  }

  getToken(): any {
    localStorage.getItem(this.tokenKey);
  }


  async isTokenExist(): Promise<boolean> {
    try {
      return await this.getToken() ? true : false;
    } catch (error) {
      return false;
    }
  }

  removeToken(): any {
    localStorage.removeItem(this.tokenKey);
  }
}
