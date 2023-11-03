import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { UserRegisterModule } from './user-register/user-register.module';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeModule } from './home/home.module';
import { TopbarModule } from './shared/topbar/topbar.module';
import { HttpClientModule } from '@angular/common/http';
import { AppInitializationService } from './services/initialization/initialization.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LoginModule,
    UserRegisterModule,
    HomeModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TopbarModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent],
  providers: [AppInitializationService]
})
export class AppModule { }
