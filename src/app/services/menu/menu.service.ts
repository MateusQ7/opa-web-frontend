import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/services/config/config.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Menu } from './menu.interface';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  backendMenuInCache:Menu[]=[]

  constructor(
    private httpClient:HttpClient,
    private configService:ConfigService,
    private authService:AuthService
  ) { }


  getMenu():Observable<Menu[]>{
    if(this.backendMenuInCache.length === 0 ){
      return this.updateMenuInCache();
    }
    else{
      return of(this.backendMenuInCache);
    }
  }

  updateMenuInCache():Observable<Menu[]>{
    return this.httpClient.get<Menu[]>(`${this.configService.apiUrl}/product`,{
      headers:{
        authorization:`Bearer ${this.authService.getToken()}`
      }

    }).pipe(
      tap((dataReceived: any) => {
        this.backendMenuInCache = dataReceived;
        // console.log(this.backendMenuInCache)
      })
    );
  }
}
