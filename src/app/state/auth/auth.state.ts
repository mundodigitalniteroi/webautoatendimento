/* eslint-disable @typescript-eslint/semi */
import { State, StateContext, Action, Selector, Store } from '@ngxs/store';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import { Injectable, NgZone } from '@angular/core';
import { OperacaoModel } from 'src/app/interfaces/operacao.interface';
import {  Login } from './auth.action';
import { AuthModel } from 'src/app/interfaces/auth.interface';


@State<AuthModel>({
  name: 'auth',
  defaults: null,
})
@Injectable()
export class AuthState {
  constructor(
    public storage: Storage,
    private store: Store,
    private router: Router,
    private zone: NgZone,
  ) {}

  @Selector()
  static all(state: AuthModel) {
    return state;
  }

  // @Selector()
  // static token(state: OperacaoModel) {
  //   return state.usuarioToken.token;
  // }

  @Action(Login)
  login(ctx: StateContext<AuthModel>, payload) {
    const state = ctx.getState;
    // console.log(payload)
    ctx.patchState({
      ...state,
      clienteId: payload.payload.clienteId,
      codigo: payload.payload.codigo,
      dataAvaliacao: payload.payload.dataAvaliacao,
      depositoId: payload.payload.depositoId,
      descricao: payload.payload.descricao,
      endereco: payload.payload.endereco,
      enderecoId: payload.payload.enderecoId,
      estabelecimento: payload.payload.estabelecimento,
      estabelecimentoId: payload.payload.estabelecimentoId,
      marcaModelo: payload.payload.marcaModelo,
      sistemaOperacional: payload.payload.sistemaOperacional,
      terminalId: payload.payload.terminalId,
      usuarioDPId: payload.payload.usuarioDPId,
    });
  }

 

  // @Action(Logout)
  // logout(ctx: StateContext<OperacaoModel>) {
  //   this.zone.run(() => this.router.navigate(['/login']));
  // }
}
