import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { BackReponse } from '../../user-register/backReponse.interface';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { LoginDto } from './loginDto.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient:HttpClient,
    private config:ConfigService,
    private auth:AuthService
  ) { }

  submitForm(form:any):Observable<LoginDto> {
    return this.httpClient.post<LoginDto>(`${this.config.apiUrl}/auth/login`,form)
  }
}
