/* eslint-disable @typescript-eslint/semi */
import { State, StateContext, Action, Selector, Store } from '@ngxs/store';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

import { Injectable, NgZone } from '@angular/core';
import { AtendimentoModel } from 'src/app/interfaces/atendimento.interface';
import {
  FinalizarAtendimento,
  SetAdress,
  SetTipoAtendimento,
  SetCadastro,
  SetDocumentUpload,
  SetFacialRocgnition,
  SetIdentity,
  SetInformations,
  SetProtocol,
} from './atendimento.action';
import { StateReset } from 'ngxs-reset-plugin';

@State<AtendimentoModel>({
  name: 'atendimento',
  defaults: null,
})
@Injectable()
export class AtendimentoState {
  constructor(
    public storage: Storage,
    private store: Store,
    private router: Router,
    private zone: NgZone
  ) {}

  @Selector()
  static all(state: AtendimentoModel) {
    return state;
  }

  // @Selector()
  // static token(state: AtendimentoModel) {
  //   return state.usuarioToken.token;
  // }

  @Action(SetTipoAtendimento)
  setTipoAtendimento(ctx: StateContext<AtendimentoModel>, payload) {
    const state = ctx.getState;
    ctx.patchState({
      ...state,
      tipoAtendimento: payload.payload.tipoAtendimento,
      tipoAtendimentoId: payload.payload.tipoAtendimentoId,
    });
  }

  // @Action(SetCadastro)
  // setCadastro(ctx: StateContext<AtendimentoModel>, payload) {
  //   const state = ctx.getState;
  //   ctx.patchState({
  //     ...state,
  //     tipoAtendimento: payload.payload.tipoPessoa,
  //   });
  // }

  @Action(SetInformations)
  setInformations(ctx: StateContext<AtendimentoModel>, payload) {
    const state = ctx.getState;
    ctx.patchState({
      ...state,
      informacaoConsulta: payload.payload.informacaoConsulta,
    });
  }

  @Action(SetIdentity)
  setIdentity(ctx: StateContext<AtendimentoModel>, payload) {
    const state = ctx.getState;
    ctx.patchState({
      ...state,
      tipoAtendimentoId: payload.payload.tipoAtendimentoId,
      tipoPessoaId: payload.payload.tipoPessoaId,
      proprietario: payload.payload.proprietario,
      responsavel: payload.payload.responsavel || null,
    });
  }

  @Action(SetAdress)
  setAdress(ctx: StateContext<AtendimentoModel>, payload) {
    const state = ctx.getState;
    ctx.patchState({
      ...state,
      enderecoProprietario: payload.payload.enderecoProprietario,
      enderecoResponsavel: payload.payload.enderecoResponsavel || null,
    });
  }
  @Action(SetFacialRocgnition)
  setFacialRocgnition(ctx: StateContext<AtendimentoModel>, payload) {
    const state = ctx.getState;
    ctx.patchState({
      ...state,
      fotoFacial: {
        tipo: payload.payload.tipo,
        base64: payload.payload.base64,
        tamanho: payload.payload.tamanho,
      },
    });
  }

  @Action(SetDocumentUpload)
  setDocumentUpload(ctx: StateContext<AtendimentoModel>, payload) {
    const state = ctx.getState;
    ctx.patchState({
      ...state,
      documentos: payload.payload,
    });
  }

  @Action(SetProtocol)
  setProtocol(ctx: StateContext<AtendimentoModel>, payload) {
    const state = ctx.getState;
    ctx.patchState({
      ...state,
      protocolo: payload.payload,
    });
  }

  @Action(FinalizarAtendimento)
  finalizarAtendimento(ctx: StateContext<AtendimentoModel>, payload) {
    const state = ctx.getState;
    this.store.dispatch(new StateReset(AtendimentoState));
    this.zone.run(() => this.router.navigate(['/home']));
  }
}
