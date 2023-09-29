import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../services/config/config.service';
import { BackReponse } from '../user-register/backReponse.interface';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient:HttpClient,
    private config:ConfigService,
    private auth:AuthService
  ) { }

  async submitForm(form:any):Promise<any>{
    this.httpClient.post(`${this.config.apiUrl}/auth/login`,form)
    .subscribe(
      (e:any)=>{
        if(e.status === 200){
          this.auth.logUser(e.token)
        }
      }
    )
  }
}
