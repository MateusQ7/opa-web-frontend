import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StorageComponent } from './storage/storage.component';
import { MenuComponent } from './menu/menu.component';
import { TopbarModule } from '../shared/topbar/topbar.module';
import { EmployeesComponent } from './employees/employees.component';


@NgModule({
  declarations: [
    DashboardComponent,
    StorageComponent,
    MenuComponent,
    EmployeesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TopbarModule
  ]
})
export class HomeModule { }
