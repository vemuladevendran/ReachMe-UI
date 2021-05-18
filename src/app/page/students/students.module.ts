import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ViewStudentComponent } from './view-student/view-student.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReportsFormComponent } from './reports-form/reports-form.component';

@NgModule({
  declarations: [
    StudentsComponent,
    ViewStudentComponent,
    ReportsFormComponent,
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatPaginatorModule,
  ]
})
export class StudentsModule { }
