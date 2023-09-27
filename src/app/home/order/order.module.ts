import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { YellowlineModule } from 'src/app/shared/yellowline/yellowline.module';



@NgModule({
  declarations: [
    OrderComponent
  ],
  exports: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    YellowlineModule
  ]
})
export class OrderModule { }
