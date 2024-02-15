/* eslint-disable @typescript-eslint/semi */
import { State, StateContext, Action, Selector, Store } from '@ngxs/store';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

import { Injectable, NgZone } from '@angular/core';
import {
  SetBoleto,
  SetInformacoesConsulta,
  SetInformations,
  SetPixEstatico,
} from './consulta.action';
import { ConsultaModel } from 'src/app/interfaces/consulta.interface';

@State<ConsultaModel>({
  name: 'consulta',
  defaults: null,
})
@Injectable()
export class ConsultaState {
  constructor(
    public storage: Storage,
    private store: Store,
    private router: Router,
    private zone: NgZone
  ) {}

  @Selector()
  static all(state: ConsultaModel) {
    return state;
  }


  @Action(SetInformacoesConsulta)
  setInformacoesConsulta(ctx: StateContext<ConsultaModel>, payload) {
    const state = ctx.getState;
    ctx.patchState({
      ...state,
      informacoesConsulta:payload.payload
    });
  }

  @Action(SetInformations)
  setInformations(ctx: StateContext<ConsultaModel>, payload) {
    const state = ctx.getState;
    ctx.patchState({
      ...state,
      informacaoDebito: payload.payload,
    });
  }
  @Action(SetBoleto)
  setBoleto(ctx: StateContext<ConsultaModel>, payload) {
    const state = ctx.getState;
    ctx.patchState({
      ...state,
      informacaoBoleto: payload.payload,
    });
  }
  @Action(SetPixEstatico)
  setPixEstatico(ctx: StateContext<ConsultaModel>, payload) {
    const state = ctx.getState;
    ctx.patchState({
      ...state,
      informacaoPixEstatico: payload.payload,
    });
  }
  // @Action(FinalizarAtendimento)
  // finalizarAtendimento(ctx: StateContext<ConsultaModel>, payload) {
  //   const state = ctx.getState;
  //   this.store.dispatch(new StateReset(ConsultaState));
  //   this.zone.run(() => this.router.navigate(['/home']));
  // }
}
