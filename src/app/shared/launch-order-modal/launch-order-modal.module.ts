import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaunchOrderModalComponent } from './launch-order-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LaunchOrderModalComponent
  ],
  exports: [
    LaunchOrderModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LaunchOrderModalModule { }
