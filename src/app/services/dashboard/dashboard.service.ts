import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "../config/config.service";
import { AuthService } from "../auth/auth.service";
import { PayedBills } from "./payedBills";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,
    private authService: AuthService
  ){}


  getPayedBills():Observable<PayedBills[]>{
    return this.httpClient.get<PayedBills[]>(`${this.configService.apiUrl}/bill`,{
      headers:{
        authorization:`Bearer ${this.authService.getToken()}`
      }
    });
  }
}
