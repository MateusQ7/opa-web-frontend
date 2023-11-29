import { Injectable } from '@angular/core';
import { Order } from './order.interface';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private httpClient:HttpClient,
    private configService:ConfigService,
    private authService:AuthService
  ) { }

  createOrder(orders:Order[]){
    // return this.httpClient.post(`${this.configService.apiUrl}/order`,orders,{
    //   headers: {
    //     token: this.authService.getToken() as string,
    //   }
    // })
  }
}
