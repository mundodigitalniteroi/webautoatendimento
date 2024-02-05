import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConsultaDebitoService {
  private apiConsultaUrl = environment.urlApiDP;
  constructor(public http: HttpClient) {}

  consultaVeiculo(payload) {
    return this.http.post(
      this.apiConsultaUrl + '/api/Faturamento/Simulacao',
      payload
    );
  }
}
