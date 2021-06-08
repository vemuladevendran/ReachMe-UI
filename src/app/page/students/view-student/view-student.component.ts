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
  qrCodeUrl: any;
  constructor(
    private studentServe: StudentService,
    private route: ActivatedRoute,
  ) {
    this.qrCodeUrl = window.location.href;
  }

  ngOnInit(): void {
    this.getStudentDetails();
  }


  async shareStudentDetail(): Promise<any> {
    const shareData = {
      title: this.data?.title,
      text: 'Student Details',
      url: window.location.href,
    };

    try {
      await navigator.share(shareData);
      console.log('Data was shared successfully');
    } catch (error) {
      console.error('Share failed:', error.message);
    }
  }

  async getStudentDetails(): Promise<void> {

    try {

      this.data = await this.studentServe.getStudent();
      this.student = this.data.find((student: any) =>
        student._id === this.route.snapshot.paramMap.get('id'));
    } catch (error) {
      console.error(error);
    }
  }

}
