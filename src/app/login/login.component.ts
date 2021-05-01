import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { TokenService } from '../services/token/token.service';
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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  passwordHide = true;
  incorrectDetails = false;
  constructor(
    private fb: FormBuilder,
    private userServe: UserService,
    private router: Router,
    private tokenServe: TokenService,
    private authServe: AuthService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    }, {
      validators: confimrPasswordValidator('password', 'confirmPassword'),
    });
  }

  ngOnInit(): void {
   
  }


  async checkUser(): Promise<any> {
    try {
      const result = await this.userServe.checkUser(this.loginForm.value);
      this.incorrectDetails = false;
      this.tokenServe.saveToken(result.token);
    } catch (error) {
      this.incorrectDetails = true;
    }
  }


}
