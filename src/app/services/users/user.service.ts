import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private settings: SettingsService,
  ) { }

  createUser(data: any): Promise<any> {
    return this.http.post(`${this.settings.API_BASE_URL}/users`, data).toPromise();
  }

  checkUser(data: any): Promise<any> {
    return this.http.post(`${this.settings.API_BASE_URL}/login`, data).toPromise();
  }

  verifyUser(data: any): Promise<any> {
    return this.http.post(`${this.settings.API_BASE_URL}/verify`, data).toPromise();
  }
}
