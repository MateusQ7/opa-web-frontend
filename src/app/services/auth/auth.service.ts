import { Injectable } from '@angular/core';
import { LoggedUserDto } from './loggedUserDto.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLogged: Boolean = true;
  userToken?: string;
  userData = {
    name: "",
    role: ``,
    restaurantName: 'Restaurante ABC'
  }

  constructor(
    private router:Router
  ) { }

  checkUserLogged(): boolean {
    if (this.userLogged) {
      return true;
    }
    return false
  };

  logUser(token: string, loggedUserProfile?: LoggedUserDto): void {
    this.userToken = token;
    this.userLogged = true
    this.userData.name = loggedUserProfile?.name || "Usuário Teste";
    this.userData.role = loggedUserProfile?.role || "Manager";
    this.userData.restaurantName = loggedUserProfile?.restaurantName || "Restaurante Teste";
    localStorage.setItem("token", token)
  }

  getToken(): string | null {
    return localStorage.getItem("token")
  }

  loggout():void{
    this.userToken = "";
    this.userLogged = false;
    this.userData.name = "Unlogged User";
    this.userData.role = "Unlogged Role";
    this.userData.restaurantName = "Unlogged Restaurant";
    localStorage.removeItem("token")
    this.router.navigate(["/login"]);
  }
}


