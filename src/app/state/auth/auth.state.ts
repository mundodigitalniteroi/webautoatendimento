/* eslint-disable @typescript-eslint/semi */
import { State, StateContext, Action, Selector, Store } from '@ngxs/store';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import { Injectable, NgZone } from '@angular/core';
import { AtendimentoModel } from 'src/app/interfaces/atendimento.interface';
import { Login } from './auth.action';
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
    private zone: NgZone
  ) {}

  @Selector()
  static all(state: AuthModel) {
    return state;
  }

  @Selector()
  static token(state: AuthModel) {
    return state.token;
  }

  @Action(Login)
  login(ctx: StateContext<AuthModel>, resp) {
    const state = ctx.getState;
    // console.log(payload)
    ctx.patchState({
      ...state,
      clienteId: resp.payload.clienteId,
      codigo: resp.payload.codigo,
      depositoId: resp.payload.depositoId,
      descricao: resp.payload.descricao,
      estabelecimento: resp.payload.estabelecimento,
      terminalId: resp.payload.terminalId,
      usuarioDPId: resp.payload.usuarioDPId,
      token: resp.payload.token,
      termos: resp.payload.termos,
    });
  }

  // @Action(Logout)
  // logout(ctx: StateContext<AtendimentoModel>) {
  //   this.zone.run(() => this.router.navigate(['/login']));
  // }
}
