import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultaDebitoService {
  private apiUrl ='https://debitos.gestordepatios.app.br/';
  constructor(

    public http: HttpClient,
    ) { }

     getDebitos(termo: string) {
      return this.http.get(this.apiUrl + `consultar?termo=${termo}`);
    }
}
