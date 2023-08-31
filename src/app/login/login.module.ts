import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [LoginComponent]
})
export class LoginModule { }
