import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TokenService } from '../services/token/token.service';
import { UserService } from '../services/users/user.service';
import { VerifiUserComponent } from './verifi-user/verifi-user.component';
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
  incorrectDetails = '';
  constructor(
    private fb: FormBuilder,
    private userServe: UserService,
    private router: Router,
    private tokenServe: TokenService,
    public dialog: MatDialog,
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
      this.tokenServe.saveToken(result.token);
    } catch (error) {
      this.incorrectDetails = error.error.message;
      if (error.error.message === 'user not verified') {
        this.openDialog();
      }
      console.log(error.error.message);
    }
  }


  private openDialog(): void {
    const dialogRef = this.dialog.open(VerifiUserComponent, {
      width: '302px',
      height: '180px',
      disableClose: true,
      data: {
          email: this.loginForm.get('email')?.value,
      }
    });

    dialogRef.afterClosed().subscribe(async () => {
      console.log('dialog colsed');
    });
  }

}
