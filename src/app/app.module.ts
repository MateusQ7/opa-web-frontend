import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserRegisterModule } from './user-register/user-register.module';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { TopbarComponent } from './shared/topbar/topbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopbarComponent,
  ],
  imports: [
    BrowserModule,
    LoginModule,
    UserRegisterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
