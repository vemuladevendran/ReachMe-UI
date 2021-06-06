import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PasswordValidationService } from '../services/password/password-validation.service';
import { TokenService } from '../services/token/token.service';
import { UserService } from '../services/users/user.service';
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
    private passwordServe: PasswordValidationService,
    public dialog: MatDialog,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    }, {
      validators: this.passwordServe.confimrPasswordValidator('password', 'confirmPassword'),
    });
  }

  ngOnInit(): void {

  }

  async checkUser(): Promise<any> {
    try {
      const result = await this.userServe.checkUser(this.loginForm.value);
      this.tokenServe.saveToken(result.token);
      this.router.navigate(['/students']);
    } catch (error) {
      this.incorrectDetails = error.error.message;
      if (error.error.message === 'user not verified') {
        this.openDialog(this.loginForm?.value);
      }
      console.log(error.error.message);
    }
  }


  async openDialog(data: any): Promise<void> {
    const result = await Swal.fire({
      title: 'Your email is not verified Click send button to send activation link to mail',
      showCancelButton: true,
      confirmButtonText: `send`,
      icon: 'info'
    });

    if (result.isConfirmed) {
      this.userServe.verifyUser({email: data.email});
    }
  }
}
