import { Injectable } from '@angular/core';
import { LoggedUserDto } from './loggedUserDto.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userLogged: Boolean = false;
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

    localStorage.setItem("token", token);
    localStorage.setItem("userName",  this.userData.name);
    localStorage.setItem("userRole", this.userData.role);
    localStorage.setItem("userRestaurantName", this.userData.restaurantName);
  }

  getToken(): string | null {
    return localStorage.getItem("token")
  }

  getLoggedUserInfo(): LoggedUserDto {
    return {
      name: localStorage.getItem("userName") ?? '',
      role: localStorage.getItem("userRole") ?? '',
      restaurantName: localStorage.getItem("userRestaurantName") ?? '',
    }
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


