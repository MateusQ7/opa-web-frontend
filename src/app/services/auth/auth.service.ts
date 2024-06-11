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
    restaurantName: 'Restaurante ABC',
    restaurantId: 0,
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
    this.userData.restaurantId = loggedUserProfile?.restaurantId || 0;

    localStorage.setItem("token", token);
    localStorage.setItem("userName",  this.userData.name);
    localStorage.setItem("userRole", this.userData.role);
    localStorage.setItem("userRestaurantName", this.userData.restaurantName);
    localStorage.setItem("userRestaurantId", String(this.userData.restaurantId));
  }

  getToken(): string | null {
    return localStorage.getItem("token")
  }

  getLoggedUserInfo(): LoggedUserDto {
    return {
      name: localStorage.getItem("userName") ?? '',
      role: localStorage.getItem("userRole") ?? '',
      restaurantName: localStorage.getItem("userRestaurantName") ?? '',
      restaurantId: Number(localStorage.getItem("userRestaurantId")) ?? 0,
    }
  }

  loggout():void{
    this.userToken = "";
    this.userLogged = false;
    this.userData.name = "Unlogged User";
    this.userData.role = "Unlogged Role";
    this.userData.restaurantName = "Unlogged Restaurant";
    this.userData.restaurantId = 0;
    localStorage.removeItem("token")
    this.router.navigate(["/login"]);
  }
}


