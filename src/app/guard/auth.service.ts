import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLogged:Boolean = true;
  userToken!:string;
  userData = {
    name:`caralhopedrocaio`,
    role:`nerd`,
    restaurantName:'Restaurante ABC'
  }

  constructor() { }

  canActivate(){

  }

  checkUserLogged():boolean{
    if(this.userLogged){
      return true;
    }
    return false
  }
}
