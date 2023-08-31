import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegisterComponent } from './user-register.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [UserRegisterComponent],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [UserRegisterComponent]
})
export class UserRegisterModule { }
