import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaunchOrderModalComponent } from './launch-order-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingModule } from '../loading/loading.module';



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
    ReactiveFormsModule,
    LoadingModule
  ]
})
export class LaunchOrderModalModule { }
