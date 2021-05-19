import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/students/student.service';

@Component({
  selector: 'app-reports-form',
  templateUrl: './reports-form.component.html',
  styleUrls: ['./reports-form.component.css']
})
export class ReportsFormComponent implements OnInit {
  reportForm: FormGroup;
  data: any;
  student: any;
  constructor(
    private fb: FormBuilder,
    private studentServ: StudentService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.reportForm = this.fb.group({
      studentName: ['', [Validators.required]],
      rollNumber: ['', [Validators.required]],
      reportTitle: ['', [Validators.required]],
      reportDate: ['', [Validators.required]],
      reportContent: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getStudentDetails();
  }

  async getStudentDetails(): Promise<void> {

    try {

      this.data = await this.studentServ.getStudent();

      this.student = this.data.find((student: any) =>
        student._id === this.route.snapshot.paramMap.get('id'));
      this.reportForm.get('studentName')?.setValue(this.student.firstName);
      this.reportForm.get('rollNumber')?.setValue(this.student.rollNumber);

    } catch (error) {
      console.error(error);
    }
  }

}
