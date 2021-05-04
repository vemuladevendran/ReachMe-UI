import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidationService } from '../services/password/password-validation.service';
import { UserService } from '../services/users/user.service';
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
    private passwordServe: PasswordValidationService,
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    }, {
      validators: this.passwordServe.confimrPasswordValidator('password', 'confirmPassword'),
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
