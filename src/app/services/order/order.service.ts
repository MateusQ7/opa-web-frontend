import { Injectable } from '@angular/core';
import { Order } from './order.interface';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { ConfigService } from '../config/config.service';
import { InProgressTables } from 'src/app/home/order/InProgressTables.interface';
import { Observable } from 'rxjs'
import { BackendOrder } from './backendOrder.interface';
import { TableDetailed } from 'src/app/shared/order-modal/tableDetailed.interface';
import { Table } from '../table/table.interface';

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

  getTables():Observable<InProgressTables[]>{
    return this.httpClient.get<InProgressTables[]>(`${this.configService.apiUrl}/tables`,{
      headers:{
        authorization:`Bearer ${this.authService.getToken()}`
      }
    });
  }

  getOrders():Observable<BackendOrder[]>{
    return this.httpClient.get<BackendOrder[]>(`${this.configService.apiUrl}/orders`,{
      headers:{
        authorization:`Bearer ${this.authService.getToken()}`
      }
    });
  }


  getSingleTable(id:number):Observable<TableDetailed>{
    return this.httpClient.get<TableDetailed>(`${this.configService.apiUrl}/table?id=${id}`,{
      headers:{
        authorization:`Bearer ${this.authService.getToken()}`
      }
    })
  }
}
