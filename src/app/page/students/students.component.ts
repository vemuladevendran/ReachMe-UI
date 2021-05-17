import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/students/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: any[] = [];
  emptyImg = false;
  noTable = true;
  filters: any = {};
  pageSizeOptions = [1, 10, 25, 100];
  totalLength: number | undefined;
  pageSize = 1;
  pageIndex = 0;
  studentsToShow: any[] = [];

  constructor(
    private studentServe: StudentService,
  ) { }

  ngOnInit(): void {
    this.getStudents();
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

  getOffset(): number {
    return this.pageIndex * this.pageSize;
  }

  async getStudents(): Promise<void> {
    try {
      this.students = await this.studentServe.getStudent(this.filters ?? {});
      if (this.students?.length > 0) {
        const offset = this.getOffset();
        this.studentsToShow = this.students.slice(offset, offset + this.pageSize);
        console.log(this.students);
        this.totalLength = this.students?.length;
        if (this.studentsToShow?.length === 0 && this.totalLength > 0) {
          this.pageIndex -= 1;
          this.getStudents();
        }
        return;
      }
      this.studentsToShow = [];
    } catch (error) {
      console.log(error);
    }
  }

  handlePageChange(event: any): void {
    console.log(event);
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getStudents();
  }

  async handleYearfilter(value: any): Promise<void> {
    this.filters.year = value;
    this.getStudents();
  }

  async handleBranchfilter(value: any): Promise<void> {
    this.filters.branch = value;
    // this.students = await this.studentServe.getStudent(this.filters);
    this.getStudents();
  }

}
