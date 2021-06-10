import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgetPasswordRoutingModule } from './forget-password-routing.module';
import { ForgetPasswordComponent } from './forget-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ForgetPasswordComponent,
    NewPasswordComponent
  ],
  imports: [
    CommonModule,
    ForgetPasswordRoutingModule,
    ReactiveFormsModule
  ]
})
export class ForgetPasswordModule { }
