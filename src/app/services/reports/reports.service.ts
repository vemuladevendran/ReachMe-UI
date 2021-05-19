import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(
    private http: HttpClient,
  ) { }


  createReport(data: any): Promise<any> {
    return this.http.post('http://localhost:3000/api/v1/reports', data).toPromise();
  }
}
