import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StorageComponent } from './storage/storage.component';
import { MenuComponent } from './menu/menu.component';
import { TopbarModule } from '../shared/topbar/topbar.module';
import { EmployeesComponent } from './employees/employees.component';
import { OrderComponent } from './order/order.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    DashboardComponent,
    StorageComponent,
    MenuComponent,
    EmployeesComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TopbarModule,
    RouterModule
  ]
})
export class HomeModule { }
