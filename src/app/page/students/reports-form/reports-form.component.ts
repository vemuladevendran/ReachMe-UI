import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportsService } from 'src/app/services/reports/reports.service';
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
  preview = false;
  formpage = true;
  previewData: any = {};

  constructor(
    private fb: FormBuilder,
    private studentServe: StudentService,
    private reportsServe: ReportsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.reportForm = this.fb.group({
      studentName: ['', [Validators.required]],
      rollNumber: ['', [Validators.required]],
      email: ['', [Validators.required]],
      repoterName: ['', [Validators.required]],
      reportTitle: ['', [Validators.required]],
      reportDate: ['', [Validators.required]],
      reportContent: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getStudentDetails();
  }

  previewPage(): void {
    if (this.preview) {
      this.previewData = {};
      this.preview = !this.preview;
      this.formpage = !this.formpage;
      return;
    }
    this.previewData = this.reportForm.value;
    this.preview = !this.preview;
    this.formpage = !this.formpage;
  }

  async printReport(data: any): Promise<void> {
    try {
      this.reportsServe.createReport(data);
      window.print();

    } catch (error) {

    }
  }

  async getStudentDetails(): Promise<void> {

    try {
      this.data = await this.studentServe.getStudent();
      this.student = this.data.find((student: any) =>
        student._id === this.route.snapshot.paramMap.get('id'));
      this.reportForm.get('studentName')?.setValue(this.student.firstName);
      this.reportForm.get('rollNumber')?.setValue(this.student.rollNumber);
      this.reportForm.get('email')?.setValue(this.student.email);
    } catch (error) {
      console.error(error);
    }
  }

}
