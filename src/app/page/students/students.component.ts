import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/students/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: any;
  constructor(
    private studentServe: StudentService,
  ) { }

  ngOnInit(): void {
    this.getStudents();
  }

  async getStudents(): Promise<void>{
   this.students = await this.studentServe.getStudent()
  }

  async deleteStudent(id: any): Promise<void> {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      await this.studentServe.deleteStudent(id);
    }
  }

}
