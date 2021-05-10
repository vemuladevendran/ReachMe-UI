import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  topnav = true;
  mobileNav = false;
  constructor() { }

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

}
