import { Injectable } from '@angular/core';
import { Order } from './order.interface';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { ConfigService } from '../config/config.service';
import { Observable, of } from 'rxjs'
import { BackendOrder } from './backendOrder.interface';
import { OrderToBackend } from './orderToBackend.interface';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  backendOrdersInCache:BackendOrder[] =[]

  orders:Order[]=[];

  constructor(
    private httpClient:HttpClient,
    private configService:ConfigService,
    private authService:AuthService
  ) { }

  createOrder(orders:OrderToBackend[]):Observable<Order[]>{
    return this.httpClient.post<Order[]>(`${this.configService.apiUrl}/order`,orders,{
      headers: {
        token: this.authService.getToken() as string,
      }
    })
  }

  getOrders(restaurantId: number):Observable<BackendOrder[]>{
    console.log(restaurantId);
    return this.httpClient.get<BackendOrder[]>(`${this.configService.apiUrl}/order/${restaurantId}`,{
      headers:{
        authorization:`Bearer ${this.authService.getToken()}`
      }
    }).pipe(
      tap((dataReceived: any) => {
        this.backendOrdersInCache = dataReceived;
      })
    );
  };

}
