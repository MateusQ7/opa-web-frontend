import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/services/config/config.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Menu } from './menu.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menu:Menu[]=[]

  constructor(
    private httpClient:HttpClient,
    private configService:ConfigService,
    private authService:AuthService
  ) { }


  getMenu():Observable<Menu[]>{
    return this.httpClient.get<Menu[]>(`${this.configService.apiUrl}/product`,{
      headers:{
        authorization:`Bearer ${this.authService.getToken()}`
      }

    })
  }
}
