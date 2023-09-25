import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StorageComponent } from './storage/storage.component';
import { FinancialComponent } from './financial/financial.component';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [
    DashboardComponent,
    StorageComponent,
    FinancialComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
