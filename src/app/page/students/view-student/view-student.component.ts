import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/students/student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  student: any;
  data: any;
  constructor(
    private studentServe: StudentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getStudentDetails();
  }

  async getStudentDetails(): Promise<void>{

    try {

      this.data = await this.studentServe.getStudent();

      this.student = this.data.find((student: any) =>
        student._id === this.route.snapshot.paramMap.get('id'));

    } catch (error) {
      console.error(error);
    }
  }

}
