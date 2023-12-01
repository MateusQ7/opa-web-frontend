import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../services/config/config.service';
import { BackReponse } from '../user-register/backReponse.interface';
import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient:HttpClient,
    private config:ConfigService,
    private auth:AuthService
  ) { }

  submitForm(form:any):Observable<any>{
    return this.httpClient.post(`${this.config.apiUrl}/auth/login`,form)
  }
}
