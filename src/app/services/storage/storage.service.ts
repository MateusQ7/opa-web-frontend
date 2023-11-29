import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/services/config/config.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StockDto } from '../../home/dtos/Stock.dtos';
import { Observable } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient-popup/ingredient.interface';
import { StorageDTO } from './storageDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private httpClient:HttpClient,
    private configService:ConfigService,
    private authService:AuthService
  ) { }

  getStorage():Observable<StorageDTO[]>{
    return this.httpClient.get<StorageDTO[]>(`${this.configService.apiUrl}/stock`,
    {
      headers:{
        authorization:`Bearer ${this.authService.getToken()}`
      }
    })
  };

  submitStorage(ingredients:Ingredient[]){
    return this.httpClient.post(`${this.configService.apiUrl}/stock`,ingredients,
      {
        headers:{
          authorization:`Bearer ${this.authService.getToken()}`
        }
      }
    )
  }

  searchStockItem(text: string): Observable<StockDto[]> {
    return this.httpClient.get<StockDto[]>(`${this.configService.apiUrl}/stock?name=${text}`)
  }

  getToken(): string | null {
    return localStorage.getItem("token")
  }
}
