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

  async submitForm(form:FormattedForm): Promise<any>{
    // this.httpClient.post(`${this.configService.apiUrl}/opa-person`,form)
    // .subscribe(
    //   (e:any)=>{
    //     return e;
    //   }
    // );
    // DADOS MOCKADOS
    return {
      status:200,
      message:'raleumofi'
    }
  };
}
