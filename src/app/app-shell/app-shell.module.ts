import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppShellComponent } from './app-shell.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppShellComponent,
    TopNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    AppShellComponent
  ]
})
export class AppShellModule { }
