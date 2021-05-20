import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(
    private http: HttpClient,
    private settings: SettingsService,
  ) { }


  createReport(data: any): Promise<any> {
    return this.http.post(`${this.settings.API_BASE_URL}/reports`, data).toPromise();
  }
}
