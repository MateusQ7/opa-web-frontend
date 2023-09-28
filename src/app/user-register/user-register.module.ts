import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegisterComponent } from './user-register.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupModule } from '../shared/popup/popup.module';
import { CepService } from '../services/cep/cep.service';
import { UserRegisterService } from './user-register.service';



@NgModule({
  declarations: [
    UserRegisterComponent
  ],
  exports: [
    UserRegisterComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PopupModule
  ],
  providers:[
    CepService,
    UserRegisterService
  ]
})
export class UserRegisterModule { }
