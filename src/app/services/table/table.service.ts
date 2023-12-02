import { Injectable } from '@angular/core';
import { Table } from './table.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { InProgressTables } from 'src/app/home/order/InProgressTables.interface';
import { ConfigService } from '../config/config.service';
import { AuthService } from '../auth/auth.service';
import { TableDetailed } from 'src/app/shared/order-modal/tableDetailed.interface';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  tables:Table[]=[

  ]

  constructor(
    private httpClient:HttpClient,
    private configService:ConfigService,
    private authService:AuthService
  ) { }

  getInProgressTables():Observable<InProgressTables[]>{
    return this.httpClient.get<InProgressTables[]>(`${this.configService.apiUrl}/table`,{
      headers:{
        authorization:`Bearer ${this.authService.getToken()}`
      }
    });
  }

  getSingleTable(id:number):Observable<TableDetailed>{
    return this.httpClient.get<TableDetailed>(`${this.configService.apiUrl}/table/${id}`,{
      headers:{
        authorization:`Bearer ${this.authService.getToken()}`
      }
    })
  }
}
