import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/services/config/config.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private httpClient:HttpClient,
    private configService:ConfigService,
    private authService:AuthService
  ) { }

  submitStorage(ingredients:any[]){
    // caue: não sei qual é o endpoint do back,sujeito a mudancas,APENAS ESBOCO

    return this.httpClient.post(`${this.configService.apiUrl}/stock`,ingredients,
      {
        headers:{
          authorization:`Bearer ${this.authService.getToken()}`
        }
      }
    )
  }
}
