import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(
    private http: HttpClient,
    private settings: SettingsService,
  ) { }

  createStudent(data: any): Promise<any> {
    return this.http.post(`${this.settings.API_BASE_URL}/students`, data).toPromise();
  }

  getStudent(filterDetails: any = {}): Promise<any> {
    return this.http.get(`${this.settings.API_BASE_URL}/api/v1/students`, { params: filterDetails  }).toPromise();
  }

  deleteStudent(id: string): Promise<any> {
    return this.http.delete(`${this.settings.API_BASE_URL}/students/${id}`).toPromise();
  }


  updateStudent(id: string, data: any): Promise<any> {
    return this.http.put(`${this.settings.API_BASE_URL}/${id}`, data).toPromise();
  }

}
