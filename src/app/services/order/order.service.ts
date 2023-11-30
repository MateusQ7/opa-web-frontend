import { Injectable } from '@angular/core';
import { Order } from './order.interface';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { ConfigService } from '../config/config.service';
import { Observable } from 'rxjs'
import { BackendOrder } from './backendOrder.interface';

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
    //mandando quantity pro back falar com o PC pra resolver isso
    // return this.httpClient.post(`${this.configService.apiUrl}/order`,orders,{
    //   headers: {
    //     token: this.authService.getToken() as string,
    //   }
    // })
  }

  getOrders():Observable<BackendOrder[]>{
    return this.httpClient.get<BackendOrder[]>(`${this.configService.apiUrl}/orders`,{
      headers:{
        authorization:`Bearer ${this.authService.getToken()}`
      }
    });
  }



}
