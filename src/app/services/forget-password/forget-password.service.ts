import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  constructor(
    private http: HttpClient,
    private settings: SettingsService,
  ) { }

  forgetPassword(data: any): Promise<any> {
    return this.http.post(`${this.settings.API_BASE_URL}/forget-password`, data).toPromise();
  }
}
