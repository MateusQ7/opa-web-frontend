import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { HomeModule } from '../home.module';
import { YellowlineModule } from 'src/app/shared/yellowline/yellowline.module';



@NgModule({
  declarations: [
    DashboardComponent,
  ],
  exports: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    YellowlineModule
  ]
})
export class DashboardModule { }
