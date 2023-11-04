import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageComponent } from './storage.component';
import { YellowlineModule } from 'src/app/shared/yellowline/yellowline.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { StockService } from '../../services/stock/stock.service';
import { StoragePopupComponent } from './storage-popup/storage-popup.component';

@NgModule({
  declarations: [
    StorageComponent,
    StoragePopupComponent,
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
