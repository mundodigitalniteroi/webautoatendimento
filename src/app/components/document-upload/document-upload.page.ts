import { Component, OnInit } from '@angular/core';
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
@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.page.html',
  styleUrls: ['./document-upload.page.scss'],
})
export class DocumentUploadPage implements OnInit {
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
  constructor(
    private cameraService: CameraService,
    private atendimentoService: AtendimentoService,
    private store: Store,
    private router: Router
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

  newPhoto(tipoDocumentoId, nome, param) {
    this.cameraService.requestPermission().then((item) => {
      if (item.camera == 'granted') {
        this.cameraService.getPhoto().then((foto) => {
          // console.log(foto)
          const fotoModel = {
            tipo: 'image/jpeg',
            base64: foto.dataUrl,
            tipoDocumentoId: tipoDocumentoId,
            tamanho: foto.exif.ImageLength,
            nome: nome + '.jpg',
          };

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
        });
      }
    });
  }
  save() {
    this.store.dispatch(new SetDocumentUpload(this.fotos));

    const atendimento: any = this.store.selectSnapshot(AtendimentoState.all);
    const informacoesLogin = this.store.selectSnapshot(AuthState.all);
    // const dataNacimentoPessoa =
    // console.log(atendimento, informacoesLogin)
    const atendimentoCompleto = {
      responsavel:
        atendimento?.tipoAtendimentoId == '1' || atendimento.tipoPessoaId != 2
          ? null
          : {
              nome:
                atendimento?.tipoAtendimentoId == '2'
                  ? atendimento?.procuradorPf?.nome
                  : atendimento?.empresa?.razaoSocial,
              cpfCnpj:
                atendimento?.tipoAtendimentoId == '2'
                  ? ''
                  : atendimento?.empresa?.cnpj,
              cnh:
                atendimento?.tipoAtendimentoId == '2'
                  ? atendimento?.procuradorPf?.cnh
                  : '',
              dataNascimento:
                atendimento?.tipoAtendimentoId == '2'
                  ? moment(atendimento?.procuradorPf?.dataNascimento).format()
                  : '',
              telefone:
                atendimento?.tipoAtendimentoId == '2'
                  ? atendimento?.procuradorPf?.telefone
                  : '',
              email:
                atendimento?.tipoAtendimentoId == '2'
                  ? atendimento?.procuradorPf?.email
                  : '',
              tipoPessoaId: atendimento?.tipoPessoaId
                ? atendimento?.tipoPessoaId
                : '',
              endereco: {
                logradouro: atendimento?.enderecoPJ?.rua
                  ? atendimento?.enderecoPJ?.rua
                  : '',
                numero: atendimento?.enderecoPJ?.numero
                  ? atendimento?.enderecoPJ?.numero
                  : '',
                complemento: atendimento?.enderecoPJ?.complemento
                  ? atendimento?.enderecoPJ?.complemento
                  : '',
                bairro: atendimento?.enderecoPJ?.bairro
                  ? atendimento?.enderecoPJ?.bairro
                  : '',
                cidade: atendimento?.enderecoPJ?.cidade
                  ? atendimento?.enderecoPJ?.cidade
                  : '',
                estado: atendimento?.enderecoPJ?.estado
                  ? atendimento?.enderecoPJ?.estado
                  : '',
                cep: atendimento?.enderecoPJ?.cep
                  ? atendimento?.enderecoPJ?.cep
                  : '',
              },
            },
      pessoa: {
        nome: atendimento?.proprietarioPf?.nome
          ? atendimento?.proprietarioPf?.nome
          : '',
        cpfCnpj: atendimento?.proprietarioPf?.cpf
          ? atendimento?.proprietarioPf?.cpf
          : '',
        cnh: atendimento?.proprietarioPf?.cnh
          ? atendimento?.proprietarioPf?.cnh
          : '',
        dataNascimento: atendimento?.proprietarioPf?.dataNascimento
          ? moment(atendimento?.proprietarioPf?.dataNascimento).format()
          : '',
        telefone: atendimento?.proprietarioPf?.telefone
          ? atendimento?.proprietarioPf?.telefone
          : '',
        email: atendimento?.proprietarioPf?.email
          ? atendimento?.proprietarioPf?.email
          : '',
        tipoPessoaId: atendimento?.tipoPessoaId
          ? atendimento?.tipoPessoaId
          : '',
        endereco: {
          logradouro: atendimento?.enderecoPF?.rua
            ? atendimento?.enderecoPF?.rua
            : '',
          numero: atendimento?.enderecoPF?.numero
            ? atendimento?.enderecoPF?.numero
            : '',
          complemento: atendimento?.enderecoPF?.complemento
            ? atendimento?.enderecoPF?.complemento
            : '',
          bairro: atendimento?.enderecoPF?.bairro
            ? atendimento?.enderecoPF?.bairro
            : '',
          cidade: atendimento?.enderecoPF?.cidade
            ? atendimento?.enderecoPF?.cidade
            : '',
          estado: atendimento?.enderecoPF?.estado
            ? atendimento?.enderecoPF?.estado
            : '',
          cep: atendimento?.enderecoPF?.cep ? atendimento?.enderecoPF?.cep : '',
        },
      },
      tipoAtendimentoId: atendimento?.tipoAtendimentoId
        ? atendimento?.tipoAtendimentoId
        : '',
      foto: {
        nome: 'ReconhecimentoFacial.jpg',
        tipo: atendimento?.fotoFacial?.tipo
          ? atendimento?.fotoFacial?.tipo
          : '',
        tamanho: 0,
        base64: atendimento?.fotoFacial?.base64
          ? atendimento?.fotoFacial?.base64
          : '',
      },
      terminalId: informacoesLogin?.terminalId
        ? informacoesLogin?.terminalId
        : '',
      referencia: atendimento?.informacaoConsulta?.numeroProcesso
        ? atendimento?.informacaoConsulta?.numeroProcesso
        : '',
      documentos: [],
    };
    this.fotos.forEach((foto) => {
      let formatFoto = {
        tipoDocumentoId: foto?.tipoDocumentoId ? foto?.tipoDocumentoId : '',
        nome: foto?.nome ? foto?.nome : '',
        tipo: foto?.tipo ? foto?.tipo : '',
        tamanho: foto?.tamanho ? foto?.tamanho : '',
        base64: foto?.base64 ? foto?.base64 : '',
      };
      atendimentoCompleto.documentos.push(formatFoto);
    });
    this.atendimentoService
      .insertAtendimento(atendimentoCompleto)
      .subscribe((item: any) => {
        const protocolo = item.data.protocolo;
        // console.log(atendimentoCompleto)
        this.store.dispatch(new SetProtocol(protocolo));
        this.router.navigate(['/complete']);
      });
  }
}
