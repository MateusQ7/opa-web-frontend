import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientPopupComponent } from './ingredient-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    IngredientPopupComponent
  ],
  exports: [
    IngredientPopupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class IngredientPopupModule { }
