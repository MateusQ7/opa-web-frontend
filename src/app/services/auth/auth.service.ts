import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLogged:Boolean = false;
  userToken?:string;
  userData = {
    name:`caralhopedrocaio`,
    role:`nerd`,
    restaurantName:'Restaurante ABC'
  }

  constructor() { }

  checkUserLogged():boolean{
    if(this.userLogged){
      return true;
    }
    return false
  };

  logUser(token:string):void{
    this.userToken = token;
    this.userLogged = true
  }
}
