import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-verifi-user',
  templateUrl: './verifi-user.component.html',
  styleUrls: ['./verifi-user.component.css']
})
export class VerifiUserComponent implements OnInit {

  constructor(
    private userServe: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }


  sendOtp(): any {
    this.userServe.verifyUser(this.data.email);
  }
}
