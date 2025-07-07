import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AtendimentoService } from 'src/app/services/atendimento/atendimento.service';
import { AuthState } from 'src/app/state/auth/auth.state';
import { SetDocumentUpload, SetProtocol } from 'src/app/state/atendimento/atendimento.action';
import { AtendimentoState } from 'src/app/state/atendimento/atendimento.state';
import * as moment from 'moment';
import { ModalController, ToastController } from '@ionic/angular';
import { PreviewPage } from '../preview/preview.page';
import { Util } from 'src/app/services/util/util.service';

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
    this.options = this.store.selectSnapshot(AtendimentoState.all);
    this.informacoesLogin = this.store.selectSnapshot(AuthState.all);
    this.atendimentoService
      .getTiposDocumentos(this.options?.tipoPessoaId, this.informacoesLogin?.terminalId, this.options?.tipoAtendimentoId)
      .subscribe((resp: any) => {
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

  async openCamera(doc, nome) {
    // Verifica se a largura da tela é maior que 768px
    if (window.innerWidth > 768) {
      // Cria um input de arquivo para desktop
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            const base64 = reader.result as string;
            this.processSelectedFile(base64, doc, nome);
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    } else {
      // Comportamento original para mobile (largura <= 768px)
      const foto = this.fotos.find((x) => x.tipoDocumentoId == doc.tipoDocumentoId);
      const modal = await this.modal.create({
        component: PreviewPage,
        cssClass: '',
        animated: true,
        componentProps: {
          title: nome,
          image: foto?.base64,
          tipoDocumentoId: doc.tipoDocumentoId,
        },
      });
      modal.onDidDismiss().then((resp) => {
        if (resp !== null && resp.data && resp.data.change) {
          doc.isUploading = true;
          doc.check = false;
          let fotoModel = this.fotos.find((x) => x.tipoDocumentoId == resp.data.tipoDocumentoId);

          if (fotoModel) {
            fotoModel.base64 = resp.data.base64;
          } else {
            fotoModel = {
              arquivoId: 0,
              tipo: 'image/jpeg',
              base64: resp.data.base64,
              tipoDocumentoId: doc.tipoDocumentoId,
              tamanho: 0,
              nome: nome + '.jpg',
            };
          }

          this.addFoto(fotoModel, doc);
        }
      });
      return await modal.present();
    }
  }

  // Adicione este método auxiliar para processar o arquivo selecionado
  private processSelectedFile(base64: string, doc: any, nome: string) {
    doc.isUploading = true;
    doc.check = false;
    
    // Remove o prefixo data:image/...;base64, se presente
    const cleanBase64 = base64.includes(',') ? base64.split(',')[1] : base64;
    
    let fotoModel = this.fotos.find((x) => x.tipoDocumentoId == doc.tipoDocumentoId);
    
    if (fotoModel) {
      fotoModel.base64 = cleanBase64;
    } else {
      fotoModel = {
        arquivoId: 0,
        tipo: 'image/jpeg',
        base64: cleanBase64,
        tipoDocumentoId: doc.tipoDocumentoId,
        tamanho: 0,
        nome: nome + '.jpg',
      };
    }
    
    this.addFoto(fotoModel, doc);
  }

  uploadFoto(fotoModel, doc) {
    const file = Util.convertBase64ToFile(fotoModel.base64);
    this.atendimentoService.uploadArquivo(file, 'PRIVADO').subscribe((resp: any) => {
      fotoModel.arquivoId = resp.data.arquivoId;
      doc.isUploading = false;
      doc.check = true;
    });
  }

  private addFoto(fotoModel, doc) {
    this.fotos.push(fotoModel);
    this.uploadFoto(fotoModel, doc);
  }

  save() {
    if (!this.fotos || this.fotos.length == 0 || this.fotos.length < this.documentos.length) {
      this.toast('Necessario tirar foto de todos os documentos solicitados');
      return false;
    }

    this.store.dispatch(new SetDocumentUpload(this.fotos));

    const atendimento: any = this.store.selectSnapshot(AtendimentoState.all);
    const informacoesLogin = this.store.selectSnapshot(AuthState.all);

    if (!atendimento || !informacoesLogin) {
      this.toast('Houve um erro ao registrar as informações, por favor refaça o cadastro');
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
              dataNascimento: atendimento?.responsavel?.dataNascimento
                ? moment.utc(atendimento?.responsavel?.dataNascimento, 'DD/MM/YYYY', true).toISOString()
                : null,
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
            ? moment.utc(atendimento?.proprietario?.dataNascimento, 'DD/MM/YYYY', true).toISOString()
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
        fotoId: atendimento.fotoId,
        terminalId: informacoesLogin?.terminalId,
        documentos: this.fotos.map((data) => ({ tipoDocumentoId: data.tipoDocumentoId, arquivoId: data.arquivoId })),
        veiculo: {
          identificadorProcesso: atendimento.informacaoConsulta.identificadorProcesso,
          numeroProcesso: atendimento.informacaoConsulta.numeroProcesso,
          placa: atendimento.informacaoConsulta.veiculo.placa,
          chassi: atendimento.informacaoConsulta.veiculo.chassi,
          marcaModelo: atendimento.informacaoConsulta.veiculo.marcaModelo.marcaModelo,
          renavam: atendimento.informacaoConsulta.veiculo.renavam,
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
            this.toast('Houver um erro ao registrar o atendimento, tente novamente');
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
