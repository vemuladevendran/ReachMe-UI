import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  topnav = true;
  mobileNav = false;
  constructor(
    private tokenServe: TokenService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  openNav(): void {
    this.topnav = false;
    this.mobileNav = true;
  }

  closeNav(): void {
    this.topnav = true;
    this.mobileNav = false;
  }

  async logout(): Promise<void> {
    const result = await Swal.fire({
      title: 'Are you sure want to logout from the app ?',
      showCancelButton: true,
      confirmButtonText: `Yes`,
      icon: 'warning'
    });

    if (result.isConfirmed) {
      this.tokenServe.removeToken();
      this.router.navigate(['/login']);
    }
  }

}
