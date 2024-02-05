import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AtendimentoService } from 'src/app/services/atendimento/atendimento.service';
import { CameraService } from 'src/app/services/camera/camera.service';
import { AuthState } from 'src/app/state/auth/auth.state';
import {
  SetDocumentUpload,
  SetProtocol,
} from 'src/app/state/atendimento/atendimento.action';
import { AtendimentoState } from 'src/app/state/atendimento/atendimento.state';
import * as moment from 'moment';
import { ModalController, ToastController } from '@ionic/angular';
import { PreviewPage } from '../preview/preview.page';
@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.page.html',
  styleUrls: ['./document-upload.page.scss'],
})
export class DocumentUploadPage implements OnInit, OnDestroy {
  line = false;
  checkCrlv = false;
  checkIpva = false;
  checkMulta = false;
  checkLicen = false;
  checkComp = false;
  fotos = [];
  options;
  informacoesLogin;
  documentos = [];
  timeout;
  loading = false;
  constructor(
    private cameraService: CameraService,
    private atendimentoService: AtendimentoService,
    private store: Store,
    private router: Router,
    private toastController: ToastController,
    private modal: ModalController
  ) {}

  ngOnInit(): void {
    this.getTiposDocumentos();
  }

  getTiposDocumentos() {
    // console.log('1');
    this.options = this.store.selectSnapshot(AtendimentoState.all);
    this.informacoesLogin = this.store.selectSnapshot(AuthState.all);
    // console.log(this.options, this.informacoesLogin)
    this.atendimentoService
      .getTiposDocumentos(
        this.options?.tipoPessoaId,
        this.informacoesLogin?.terminalId,
        this.options?.tipoAtendimentoId
      )
      .subscribe((resp: any) => {
        // console.log(resp)
        this.documentos = resp.data;
      });
  }

  takePhoto() {
    this.checkCrlv = true;
    this.checkIpva = true;
    this.checkMulta = true;
    this.checkLicen = true;
    this.checkComp = true;
  }

  // newPhoto(tipoDocumentoId, nome, param) {
  //   this.cameraService.requestPermission().then((item) => {
  //     if (item.camera == 'granted') {
  //       this.cameraService.getPhoto().then((foto) => {
  //         // console.log(foto)
  //         const fotoModel = {
  //           tipo: 'image/jpeg',
  //           base64: foto.dataUrl,
  //           tipoDocumentoId: tipoDocumentoId,
  //           tamanho: foto.exif.ImageLength,
  //           nome: nome + '.jpg',
  //         };

  //         this.fotos.push(fotoModel);

  //         switch (param) {
  //           case 'checkCrlv':
  //             this.checkCrlv = true;
  //             break;

  //           case 'checkIpva':
  //             this.checkIpva = true;
  //             break;

  //           case 'checkMulta':
  //             this.checkMulta = true;
  //             break;

  //           case 'checkLicen':
  //             this.checkLicen = true;
  //             break;

  //           case 'checkComp':
  //             this.checkComp = true;
  //             break;

  //           default:
  //             break;
  //         }
  //       });
  //     }
  //   });
  // }

  async openCamera(tipoDocumentoId, nome, param) {
    const modal = await this.modal.create({
      component: PreviewPage,
      cssClass: '',
      animated: true,
      componentProps: {
        title: nome,
      },
    });
    modal.onDidDismiss().then((resp) => {
      if (resp !== null && resp.data) {
        const fotoModel = {
          tipo: 'image/jpeg',
          base64: resp.data,
          tipoDocumentoId: tipoDocumentoId,
          tamanho: 0,
          nome: nome + '.jpg',
        };

        this.addFoto(fotoModel, param);
      }
    });
    return await modal.present();
    // this.router.navigate(['/preview']);
  }

  private addFoto(fotoModel, param) {
    this.fotos.push(fotoModel);

    switch (param) {
      case 'checkCrlv':
        this.checkCrlv = true;
        break;

      case 'checkIpva':
        this.checkIpva = true;
        break;

      case 'checkMulta':
        this.checkMulta = true;
        break;

      case 'checkLicen':
        this.checkLicen = true;
        break;

      case 'checkComp':
        this.checkComp = true;
        break;

      default:
        break;
    }
  }

  save() {
    if (
      !this.fotos ||
      this.fotos.length == 0 ||
      this.fotos.length < this.documentos.length
    ) {
      this.toast('Necessario tirar foto de todos os documentos solicitados');
      return false;
    }

    this.store.dispatch(new SetDocumentUpload(this.fotos));

    const atendimento: any = this.store.selectSnapshot(AtendimentoState.all);
    const informacoesLogin = this.store.selectSnapshot(AuthState.all);

    if (!atendimento || !informacoesLogin) {
      this.toast(
        'Houve um erro ao registrar as informações, por favor refaça o cadastro'
      );
      this.timeout = setTimeout(() => {
        this.router.navigate(['/home']);
      }, 3000);
    }

    if (atendimento) {
      this.loading = true;
      const atendimentoCompleto = {
        responsavel: atendimento?.responsavel
          ? {
              nome: atendimento?.responsavel?.nome,
              cpfCnpj: atendimento?.responsavel?.cpf,
              cnh: atendimento?.responsavel?.cnh,
              dataNascimento: moment(
                atendimento?.responsavel?.dataNascimento
              ).format(),
              telefone: atendimento?.responsavel?.telefone,
              email: atendimento?.responsavel?.email,
              endereco: {
                logradouro: atendimento?.enderecoResponsavel?.rua,
                numero: atendimento?.enderecoResponsavel?.numero,
                complemento: atendimento?.enderecoResponsavel?.complemento,
                bairro: atendimento?.enderecoResponsavel?.bairro,
                cidade: atendimento?.enderecoResponsavel?.cidade,
                estado: atendimento?.enderecoResponsavel?.estado,
                cep: atendimento?.enderecoResponsavel?.cep,
              },
            }
          : null,
        proprietario: {
          tipoPessoaId: atendimento.tipoPessoaId,
          nome: atendimento?.proprietario?.nome,
          cpfCnpj: atendimento?.proprietario?.cpf,
          cnh: atendimento?.proprietario?.cnh,
          dataNascimento: atendimento?.proprietario?.dataNascimento
            ? moment(atendimento?.proprietario?.dataNascimento).format()
            : null,
          telefone: atendimento?.proprietario?.telefone,
          email: atendimento?.proprietario?.email,
          endereco: {
            logradouro: atendimento?.enderecoProprietario?.rua,
            numero: atendimento?.enderecoProprietario?.numero,
            complemento: atendimento?.enderecoProprietario?.complemento,
            bairro: atendimento?.enderecoProprietario?.bairro,
            cidade: atendimento?.enderecoProprietario?.cidade,
            estado: atendimento?.enderecoProprietario?.estado,
            cep: atendimento?.enderecoProprietario?.cep,
          },
        },
        tipoAtendimentoId: atendimento?.tipoAtendimentoId,
        foto: {
          nome: 'foto.jpg',
          tipo: atendimento?.fotoFacial?.tipo,
          tamanho: 0,
          base64: atendimento?.fotoFacial?.base64,
        },
        terminalId: informacoesLogin?.terminalId,
        documentos: this.fotos,
        veiculo: {
          identificadorProcesso:
            atendimento.informacaoConsulta.identificadorProcesso,
          numeroProcesso: atendimento.informacaoConsulta.numeroProcesso,
          placa: atendimento.informacaoConsulta.veiculo.placa,
        },
      };

      this.atendimentoService.insertAtendimento(atendimentoCompleto).subscribe(
        (item: any) => {
          this.loading = false;
          const protocolo = item.data.protocolo;
          this.store.dispatch(new SetProtocol(protocolo));
          this.router.navigate(['/complete']);
        },
        (error) => {
          this.loading = false;

          if (error.error && error.error.Message) {
            this.toast(error.error.Message);
          } else {
            this.toast(
              'Houver um erro ao registrar o atendimento, tente novamente'
            );
          }
        }
      );
    }
  }

  async toast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }

  ngOnDestroy(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }
}
