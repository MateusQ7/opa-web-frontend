import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductModalComponent } from './create-product-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateProductModalComponent
  ],
  exports: [
    CreateProductModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CreateProductModalModule { }
