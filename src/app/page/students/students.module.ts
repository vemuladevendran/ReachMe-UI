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
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AddStudentComponent } from './add-student/add-student.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import {MatStepperModule} from '@angular/material/stepper'; 
@NgModule({
  declarations: [
    StudentsComponent,
    AddStudentComponent,
    ViewStudentComponent,
    ReportsFormComponent,
    UpdateStudentComponent,
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    QRCodeModule,
    MatStepperModule,
  ]
})
export class StudentsModule { }
