import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { OrderModalComponent } from './order-modal.component';
import { LoadingModule } from '../loading/loading.module';



@NgModule({
  declarations: [
    OrderModalComponent
  ],
  exports: [
    OrderModalComponent
  ],
  imports: [
    CommonModule,
    LoadingModule
  ],
  providers:[DatePipe]
})
export class OrderModalModule { }
