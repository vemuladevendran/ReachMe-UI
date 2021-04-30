import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from '../services/users/user.service';
const confimrPasswordValidator = (c1: string, c2: string): ValidatorFn => {
  return (passwordValue: AbstractControl): null | ValidationErrors => {
    if (passwordValue.get(c1)?.value !== passwordValue.get(c2)?.value) {
      passwordValue.get(c2)?.setErrors({ passwordMismatch: true });
      return {
        passwordMismatch: 'Password mismatcgh',
      };
    }

    if (passwordValue.get(c2)?.errors) {
      const { passwordMismatch, ...errors } = passwordValue.get(c2)?.errors || {};
      passwordValue.get(c2)?.setErrors(Object.keys(errors).length === 0 ? null : errors);
    }

    return null;
  };
};

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  passwordHide = true;
  confirmPasswordHide = true;
  emailErrors = '';
  constructor(
    private fb: FormBuilder,
    private userServe: UserService,
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    }, {
      validators: confimrPasswordValidator('password', 'confirmPassword'),
    });
  }


  ngOnInit(): void {
  }

  async createUser(): Promise<any> {
    try {
      const result = await this.userServe.createUser(this.signupForm?.value);
    } catch (error) {
      console.log(error);
      this.emailErrors = error?.error?.message;
      this.signupForm?.get('email')?.setErrors(error);
    }
  }

}
