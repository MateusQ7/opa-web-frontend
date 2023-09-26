import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CepData } from './cepData.interface'; // Importe a interface CepData

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
        // Mapeie os dados para a interface CepData
        return {
          cep: data.cep,
          logradouro: data.logradouro,
          bairro: data.bairro,
          localidade: data.localidade,
          uf: data.uf,
        } as CepData;
      })
    );
  }
}