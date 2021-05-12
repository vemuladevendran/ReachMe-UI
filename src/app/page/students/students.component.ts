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
  emptyImg = false;
  noTable = true;
  constructor(
    private studentServe: StudentService,
  ) { }

  ngOnInit(): void {
    this.getStudents();
  }

  async getStudents(): Promise<void> {
    this.students = await this.studentServe.getStudent();
    if (this.students.length === 0) {
      this.emptyImg = true;
      this.noTable = false;
    }
    console.log(this.students);
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
      try {
        await this.studentServe.deleteStudent(id);
        this.getStudents();
      } catch (error) {
        console.log(error, 'fail to delete');

      }
    }
  }

}
