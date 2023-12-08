import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageComponent } from './storage.component';
import { YellowlineModule } from 'src/app/shared/yellowline/yellowline.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { StorageService } from 'src/app/services/storage/storage.service';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

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
    FormsModule,
    NgSelectModule,
    NgbTooltipModule
  ],
  providers: [StorageService]
})
export class StorageModule { }
