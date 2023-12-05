import { Injectable } from '@angular/core';
import { Order } from './order.interface';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { ConfigService } from '../config/config.service';
import { Observable } from 'rxjs'
import { BackendOrder } from './backendOrder.interface';
import { OrderToBackend } from './orderToBackend.interface';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  backendOrdersInCache!:BackendOrder[]

  orders:Order[]=[];

  constructor(
    private httpClient:HttpClient,
    private configService:ConfigService,
    private authService:AuthService
  ) { }

  createOrder(orders:OrderToBackend){
    // console.log('aosdok')
    return this.httpClient.post(`${this.configService.apiUrl}/order`,orders,{
      headers: {
        token: this.authService.getToken() as string,
      }
    })
  }

  getOrders():Observable<BackendOrder[]>{
    // if(this.orders.length = 0 ){
    //   // from
    // }
    // else{
    //   // first value from
    // }
    const data = this.httpClient.get<BackendOrder[]>(`${this.configService.apiUrl}/order`,{
      headers:{
        authorization:`Bearer ${this.authService.getToken()}`
      }
    }).pipe(
      tap((dataRecieved: any) => {
        this.backendOrdersInCache = dataRecieved;
        // console.log(this.backendOrdersInCache)
      })
    );
    return data
  }



}
