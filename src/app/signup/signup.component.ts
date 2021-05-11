import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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
    private router: Router,
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

      const dialog = await Swal.fire({
        icon: 'info',
        title: 'Activate',
        text: 'Activation link is sent to your email click the link to activate',
      });
      if (dialog.isConfirmed) {
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.log(error);
      this.emailErrors = error?.error?.message;
      this.signupForm?.get('email')?.setErrors(error);
    }
  }

}
