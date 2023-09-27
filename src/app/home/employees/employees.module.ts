import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees.component';
import { YellowlineModule } from 'src/app/shared/yellowline/yellowline.module';



@NgModule({
  declarations: [
    EmployeesComponent
  ],
  exports:
  [EmployeesComponent
  ],
  imports: [
    CommonModule,
    YellowlineModule
  ]
})
export class EmployeesModule { }
