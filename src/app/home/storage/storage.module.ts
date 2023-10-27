import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageComponent } from './storage.component';
import { YellowlineModule } from 'src/app/shared/yellowline/yellowline.module';
import { CreateUpdateProductComponent } from './create-update-stock/create-update-stock.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { StockService } from '../../services/stock/stock.service';

@NgModule({
  declarations: [
    StorageComponent,
    CreateUpdateProductComponent,
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
  ],
  providers: [StockService]
})
export class StorageModule { }
