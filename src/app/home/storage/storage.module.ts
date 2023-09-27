import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageComponent } from './storage.component';
import { YellowlineModule } from 'src/app/shared/yellowline/yellowline.module';



@NgModule({
  declarations: [
    StorageComponent
  ],
  exports: [
    StorageComponent
  ],
  imports: [
    CommonModule,
    YellowlineModule
  ]
})
export class StorageModule { }
