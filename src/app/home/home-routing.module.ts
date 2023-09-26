import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeesComponent } from './employees/employees.component';
import { StorageComponent } from './storage/storage.component';
import { MenuComponent } from './menu/menu.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component:DashboardComponent
  },
  {
    path: 'employees',
    component:EmployeesComponent
  },
  {
    path: 'storage',
    component:StorageComponent
  },
  {
    path: 'menu',
    component:MenuComponent
  },
  {
    path:'order',
    component:OrderComponent
  },
  {
    path: '',
    redirectTo: '/home/dashboard',
    pathMatch: 'full'
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
