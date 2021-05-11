import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(
    private http: HttpClient,
  ) { }

  createStudent(data: any): Promise<any> {
    return this.http.post('http://localhost:3000/api/v1/students', data).toPromise();
  }

  getStudent(): Promise<any> {
    return this.http.get('http://localhost:3000/api/v1/students').toPromise();
  }

  deleteStudent(id: string): Promise<any> {
    return this.http.delete(`http://localhost:3000/api/v1/students/${id}`).toPromise();
  }


  updateStudent(id: string, data: any): Promise<any> {
    return this.http.put(`http://localhost:3000/api/v1/students/${id}`, data).toPromise();
  }

}
