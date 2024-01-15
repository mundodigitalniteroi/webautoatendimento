/* eslint-disable @typescript-eslint/semi */
import { State, StateContext, Action, Selector, Store } from '@ngxs/store';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import { Injectable, NgZone } from '@angular/core';
import { OperacaoModel } from 'src/app/interfaces/operacao.interface';
import {  SetAdress, SetCadastro, SetIdentity, SetInformations, SetPessoa } from './registro.action';


@State<OperacaoModel>({
  name: 'auth',
  defaults: null,
})
@Injectable()
export class RegistroState {
  constructor(
    public storage: Storage,
    private store: Store,
    private router: Router,
    private zone: NgZone,
  ) {}

  @Selector()
  static all(state: OperacaoModel) {
    return state;
  }

  // @Selector()
  // static token(state: OperacaoModel) {
  //   return state.usuarioToken.token;
  // }

  @Action(SetPessoa)
  setPessoa(ctx: StateContext<OperacaoModel>, payload) {
    const state = ctx.getState;
    ctx.patchState({
      ...state,
      tipoPessoa: payload.payload.tipoPessoa,
      tipoAtendimentoId:payload.payload.tipoAtendimentoId,
    });
  }

  @Action(SetCadastro)
  setCadastro(ctx: StateContext<OperacaoModel>, payload) {
    const state = ctx.getState;
    ctx.patchState({
      ...state,
      tipoPessoa: payload.payload.tipoPessoa,
    });
  }

  @Action(SetInformations)
  setInformations(ctx: StateContext<OperacaoModel>, payload) {
    const state = ctx.getState;
    ctx.patchState({
      ...state,
      informacaoConsulta: payload.payload.informacaoConsulta,
    });
  }

  @Action(SetIdentity)
  setIdentity(ctx: StateContext<OperacaoModel>, payload) {
    // console.log(payload)
    const state = ctx.getState;
    ctx.patchState({
      ...state,
      tipoProprietario: payload.payload.tipoProprietario,
      proprietarioPf:{
        nome: payload.payload.proprietarioPf.nomeProp,
        dataNascimento:payload.payload.proprietarioPf.dataProp,
        cpf: payload.payload.proprietarioPf.cpfProp,
        cnh: payload.payload.proprietarioPf.cnhProp,
        telefone: payload.payload.proprietarioPf.telefoneProp,
        email: payload.payload.proprietarioPf.emailProp,
        
      },
      procuradorPf:{
        nome: payload.payload.proprietarioPf.nomeProc,
        dataNascimento:payload.payload.proprietarioPf.dataNascimentoProc,
        cpf: payload.payload.proprietarioPf.cpfProc,
        cnh: payload.payload.proprietarioPf.cnhProc,
        telefone: payload.payload.proprietarioPf.telefoneProc,
        email: payload.payload.proprietarioPf.emailProc,
      }, 
      empresa:{
        cnpj: payload.payload.proprietarioPj.cnpj,
        razaoSocial:payload.payload.proprietarioPj.razaoSocial,
      }
    });
  }

  @Action(SetAdress)
  setAdress(ctx: StateContext<OperacaoModel>, payload) {
    const state = ctx.getState;
    ctx.patchState({
      ...state,
      enderecoPF:{
        cep: payload.payload.enderecoPF.cep,
        rua: payload.payload.enderecoPF.rua,
        numero: payload.payload.enderecoPF.numero,
        estado: payload.payload.enderecoPF.estado,
        complemento: payload.payload.enderecoPF.complemento,
        cidade: payload.payload.enderecoPF.cidade,
        bairro: payload.payload.enderecoPF.bairro,
        observacoes: payload.payload.enderecoPF.observacoes,
      },
      enderecoPJ:{
        cep: payload.payload.enderecoPJ.cep,
        rua: payload.payload.enderecoPJ.rua,
        numero: payload.payload.enderecoPJ.numero,
        estado: payload.payload.enderecoPJ.estado,
        complemento: payload.payload.enderecoPJ.complemento,
        cidade: payload.payload.enderecoPJ.cidade,
        bairro: payload.payload.enderecoPJ.bairro,
        observacoes: payload.payload.enderecoPJ.observacoes,
      }, 
    });
  }
  // @Action(SetImpressora)
  // setImpressora(ctx: StateContext<OperacaoModel>, payload) {
  //   const state = ctx.getState;
  //   ctx.patchState({
  //     ...state,
  //     impressoraSelecionada: payload.payload,
  //   });
  // }


  // @Action(Logout)
  // logout(ctx: StateContext<OperacaoModel>) {
  //   this.zone.run(() => this.router.navigate(['/login']));
  // }
}
