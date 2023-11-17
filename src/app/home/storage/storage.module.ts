import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageComponent } from './storage.component';
import { YellowlineModule } from 'src/app/shared/yellowline/yellowline.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { StockService } from '../../services/stock/stock.service';
import { IngredientPopupModule } from 'src/app/shared/ingredient-popup/ingredient-popup.module';

@NgModule({
  declarations: [
    StorageComponent,
  ],
  exports: [
    StorageComponent,
  ],
  imports: [
    CommonModule,
    YellowlineModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    NgSelectModule,
    IngredientPopupModule
  ],
  providers: [StockService]
})
export class StorageModule { }
