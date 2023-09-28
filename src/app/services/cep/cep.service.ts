import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CepData } from './cepData.interface';

@Injectable({
  providedIn: 'root',
})
export class CepService {
  private apiCep = 'https://viacep.com.br/ws/';

  constructor(private http: HttpClient) {}

  searchForCep(cep: string): Observable<CepData> {
    const apiUrl = `${this.apiCep}${cep}/json/`;

    return this.http.get(apiUrl).pipe(
      map((data: any) => {
        return {
          cep: data.cep,
          street: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          uf: data.uf,
        } as CepData;
      })
    );
  }
}
