import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FormattedForm } from './formatted-form';
import { ConfigService } from '../services/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {

  constructor(
    private httpClient:HttpClient,
    private configService:ConfigService
  ) { }

  submitForm(form:FormattedForm){
    this.httpClient.post(`${this.configService.apiUrl}/opa-person`,
      {
        form
      }
    )
    .subscribe(
      (e:any)=>{
        console.log(e.message);
      }
    );
  };
}
