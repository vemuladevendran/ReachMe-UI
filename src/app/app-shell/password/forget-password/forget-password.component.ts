import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ForgetPasswordService } from 'src/app/services/forget-password/forget-password.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  isResetlinkSent = false;
  email = new FormControl('');
  constructor(
    private forgetPasswordServe: ForgetPasswordService,

  ) { }

  ngOnInit(): void {
  }


  async sendEmail(): Promise<any> {
    try {
      await this.forgetPasswordServe.forgetPassword({email: this.email.value});
      this.isResetlinkSent = true;
    } catch (error) {
      const result = await Swal.fire({
        title: 'Invalid Details',
        text: 'Check the details before submit',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
      console.error(error);
    }
  }

}
