import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegisterComponent } from './user-register.component';



@NgModule({
  declarations: [UserRegisterComponent],
  imports: [
    CommonModule
  ],
  exports: [UserRegisterComponent]
})
export class UserRegisterModule { }
