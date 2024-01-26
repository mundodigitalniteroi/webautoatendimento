import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl ='https://api.atendimento.gestordepatios.app.br/terminal/';
  constructor(

    public http: HttpClient,
    ) { }

     login(token: string) {
      return this.http.get(this.apiUrl + `login?codigo=${token}`);
    }

  }
