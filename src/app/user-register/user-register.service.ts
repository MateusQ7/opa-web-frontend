import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FormattedForm } from './formatted-form';
import { ConfigService } from '../services/config/config.service';
import { Observable } from 'rxjs';
import { BackReponse } from './backReponse.interface';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {

  constructor(
    private httpClient:HttpClient,
    private configService:ConfigService
  ) { }

  submitForm(form:FormattedForm): Observable<BackReponse> {
    return this.httpClient.post<BackReponse>(`${this.configService.apiUrl}/opa-person`, form)
  }
}
