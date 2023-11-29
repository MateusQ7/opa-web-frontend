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

  menu:Menu[]=[
    {
      id:1,
      description:'lobia',
      name:'catinha de parangolas',
      value:19.99
    },
    {
      id:2,
      description:'p',
      name:'parmegilaine',
      value:59.99
    },
    {
      id:4,
      description:'fisca de eixe',
      name:'fisca de eixe',
      value:39.99
    },
    {
      id:3,
      description:'lobia',
      name:'gerardo bastos',
      value:29.99
    },
  ]

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
