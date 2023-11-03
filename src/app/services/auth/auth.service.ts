import { Injectable } from '@angular/core';

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

  constructor() { }

  checkUserLogged(): boolean {
    if (this.userLogged) {
      return true;
    }
    return false
  };

  logUser(token: string): void {
    this.userToken = token;
    this.userLogged = true
    localStorage.setItem("token", token)
  }

  getToken(): string | null {
    return localStorage.getItem("token")
  }
}
