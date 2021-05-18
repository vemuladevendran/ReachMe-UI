import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './add-student/add-student.component';
import { ReportsFormComponent } from './reports-form/reports-form.component';
import { StudentsComponent } from './students.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { ViewStudentComponent } from './view-student/view-student.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsComponent
  },
  {
    path: 'add-student',
    component: AddStudentComponent
  },
  {
    path: ':id/update-student',
    component: UpdateStudentComponent
  },
  {
    path: ':id/view-student',
    component: ViewStudentComponent
  },
  {
    path: 'report-details',
    component: ReportsFormComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
