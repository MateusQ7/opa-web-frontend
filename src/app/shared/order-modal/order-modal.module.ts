import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderModalComponent } from './order-modal.component';



@NgModule({
  declarations: [
    OrderModalComponent
  ],
  exports: [
    OrderModalComponent
  ],
  imports: [
    CommonModule
  ]
})
export class OrderModalModule { }
