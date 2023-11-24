import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaunchOrderModalComponent } from './launch-order-modal.component';



@NgModule({
  declarations: [
    LaunchOrderModalComponent
  ],
  exports: [
    LaunchOrderModalComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LaunchOrderModalModule { }
