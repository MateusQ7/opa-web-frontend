import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { TopbarModule } from '../shared/topbar/topbar.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { EmployeesModule } from './employees/employees.module';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';
import { StorageModule } from './storage/storage.module';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  exports: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TopbarModule,
    RouterModule,
    DashboardModule,
    EmployeesModule,
    MenuModule,
    OrderModule,
    StorageModule

  ],
})
export class HomeModule { }
