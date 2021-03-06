import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/students/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {
  updateStudentForm: FormGroup;
  data: any;
  student: any;
  personalDetails = true;
  educationDetails = false;
  constructor(
    private fb: FormBuilder,
    private studentServ: StudentService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.updateStudentForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      fatherName: ['', [Validators.required]],
      motherName: ['', [Validators.required]],
      address: ['', [Validators.required]],
       // education details
       tenthyear: ['', [Validators.required]],
       plustwoyear: ['', [Validators.required]],
       tenthMark: ['', [Validators.required]],
       plustwoMark: ['', [Validators.required]],
       tenthSchool: [''],
       plustwoSchool: [''],
       rollNumber: ['', [Validators.required]],
       examNumber: ['', [Validators.required]],
       year: ['', [Validators.required]],
       branch: ['', [Validators.required]],
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
      // console.log(this.student);

      this.updateStudentForm.setValue({
        firstName: this.student.firstName,
        lastName: this.student.lastName,
        email: this.student.email,
        gender: this.student.gender,
        dob: this.student.dob,
        mobileNumber: this.student.mobileNumber,
        fatherName: this.student.fatherName,
        motherName: this.student.motherName,
        address: this.student.address,
        // education details
        tenthyear: this.student.tenthyear,
        plustwoyear: this.student.plustwoyear,
        tenthMark: this.student.tenthMark,
        plustwoMark: this.student.plustwoMark,
        tenthSchool: this.student.tenthSchool,
        plustwoSchool: this.student.plustwoSchool,
        rollNumber: this.student.rollNumber,
        examNumber: this.student.examNumber,
        year: this.student.year,
        branch: this.student.branch,
      });

    } catch (error) {
      console.error(error);
    }
  }

  changeForm(): void {
    this.personalDetails = !this.personalDetails;
    this.educationDetails = !this.educationDetails;
  }


  async handleSubmit(id: string, data: any): Promise<void> {
    try {
      await this.studentServ.updateStudent(id, data);

      const result = await Swal.fire('Student Data Updated Successfuly');
      if (result.isConfirmed) {
        this.router.navigate(['/students']);
      }

    } catch (error) {
      console.error(error);
    }
  }

}
