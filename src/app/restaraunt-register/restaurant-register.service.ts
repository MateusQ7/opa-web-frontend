import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "../services/config/config.service";
import { RestaurantForm } from "./dtos/restaurant-form";
import { RestaurantOutput } from "./dtos/restaurantOutput.interface";
import { Observable } from "rxjs";
import { RestaurantInfo } from "./dtos/restaurantInfo.interface";


@Injectable({
  providedIn: 'root'
})
export class RestaurantRegisterService {

  constructor(
    private httpClient:HttpClient,
    private configService:ConfigService
  ) { }

  submitForm(form:RestaurantForm): Observable<RestaurantOutput> {
    return this.httpClient.post<RestaurantOutput>(`${this.configService.apiUrl}/restaurant`, form)
  }

  getRestaraunt(id: number): Observable<RestaurantInfo> {
    return this.httpClient.get<RestaurantInfo>(`${this.configService.apiUrl}/restaurant/${id}`);
  }
}
