import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { YellowlineModule } from 'src/app/shared/yellowline/yellowline.module';
import { OrderModalModule } from 'src/app/shared/order-modal/order-modal.module';
import { LaunchOrderModalModule } from 'src/app/shared/launch-order-modal/launch-order-modal.module';



@NgModule({
  declarations: [
    OrderComponent
  ],
  exports: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    YellowlineModule,
    OrderModalModule,
    LaunchOrderModalModule
  ]
})
export class OrderModule { }
