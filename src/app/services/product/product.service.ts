import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { Observable } from 'rxjs';
import { StockDto } from '../../home/dtos/Stock.dtos';
import { CreateProductDto } from '../../home/dtos/CreateProductDto';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,
    private authService: AuthService,
  ) { }

  createProduct(createProductDto: CreateProductDto[]): Observable<any> {
    return this.httpClient.post(`${this.configService.apiUrl}/product`, createProductDto, {
      headers:{
        authorization:`Bearer ${this.authService.getToken()}`
      }
    })
  }

  getToken(): string | null {
    return localStorage.getItem("token")
  }
}
