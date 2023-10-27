import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { Observable } from 'rxjs';
import { StockDto } from '../../home/dtos/Stock.dtos';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) { }

  searchStockItem(text: string): Observable<StockDto[]> {
    return this.httpClient.get<StockDto[]>(`${this.configService.apiUrl}/stock?name=${text}`)
  }

  getToken(): string | null {
    return localStorage.getItem("token")
  }
}
