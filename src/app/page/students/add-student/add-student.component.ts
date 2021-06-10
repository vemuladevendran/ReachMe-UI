import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/students/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  addStudentForm: FormGroup;
  alreadyExist = '';
  personalDetails = true;
  educationDetails = false;
  constructor(
    private fb: FormBuilder,
    private studentServe: StudentService,
    private router: Router
  ) {
    this.addStudentForm = this.fb.group({
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
  }

  changeForm(): void {
    this.personalDetails = !this.personalDetails;
    this.educationDetails = !this.educationDetails;
  }


  async handleSubmit(): Promise<void> {
    try {
      await this.studentServe.createStudent(this.addStudentForm.value);
      const result = await Swal.fire('New Student Added Successfuly');
      if (result.isConfirmed) {
        this.router.navigate(['/students']);
      }

    } catch (error) {
      this.addStudentForm?.get('rollNumber')?.setErrors(error);
      this.addStudentForm?.get('examNumber')?.setErrors(error);
      this.alreadyExist = error.error.message;
      console.log(error, 'fail to add student');
    }
  }


}
