import { Injectable } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { ToastController } from '@ionic/angular';
import EscPosEncoder from '@mineminemine/esc-pos-encoder-ionic';
import { Storage } from '@ionic/storage';
import * as moment from 'moment-timezone';
import 'moment/locale/pt-br';
// import { DecimalPipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { Util } from '../util/util.service';
import { Comprovante } from 'src/app/interfaces/comprovante.interface';

@Injectable({
  providedIn: 'root',
})
export class PrintService {
  private unsubscribeAll$ = new Subject();
  permissions = ['BLUETOOTH_CONNECT', 'BLUETOOTH_SCAN'];
  constructor(
    public btSerial: BluetoothSerial,
    private toastController: ToastController,
    private storage: Storage,
    private diagnostic: Diagnostic,
    private store: Store
  ) { }

  searchBluetoothPrinter() {
    return this.btSerial.list();
  }

  connectToBluetoothPrinter(macAddress) {
    return this.btSerial.connect(macAddress);
  }

  disconnectBluetoothPrinter() {
    return this.btSerial.disconnect();
  }

  hasPermission(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.diagnostic
        .getPermissionsAuthorizationStatus(this.permissions)
        .then((status) => {
          if (status != this.diagnostic.permissionStatus.GRANTED) {
            this.requestPermission()
              .then((reqStatus) => {
                resolve(reqStatus);
              })
              .catch((err) => {
                reject(err);
              });
          } else {
            reject(status);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  requestPermission(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.diagnostic
        .requestRuntimePermissions(this.permissions)
        .then((status) => {
          resolve(status);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  printData(data: any) {
    this.storage.get('printer').then((p) => {
      this.connectToBluetoothPrinter(p.printer).subscribe(
        (_) => {
          this.btSerial.write(data).then(
            (_) => {
              this.disconnectBluetoothPrinter();
            },
            (err) => {
              this.toast('Erro ao imprimir o comprovante');
            }
          );
        },
        (err) => {
          this.toast('Erro ao conectar a impressora');
        }
      );
    });
  }

  async printProtocolo(protocolo) {
    const printer = await this.storage.get('printer');
    const encoder = new EscPosEncoder();
    const img = new Image();
    img.src = '/assets/login/logo_patiosg_320.png';
    img.crossOrigin = 'Anonymous';

    img.onload = () => {
      encoder
        .initialize()
        .align('center')
        .image(img, 320, 80, 'atkinson', 256)
        .size('normal')
        .newline()
        .align('center')
        .width(1)
        .height(1)
        .line('Protocolo do Atendimento')
        .newline()
        .align('center')
        .width(4)
        .height(5)
        .bold()
        .line(protocolo)
        .newline()
        .bold(false)
        .width(1)
        .height(1)
        .line(moment.utc().tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm'))
        .newline()
        .newline()
        .newline()
        .newline()
        .newline()
        .newline()
        .newline()
        .newline()
        .newline()
        .newline()
        .newline();

      if (printer.usarGuilhotina) {
        encoder.cut('partial');
      }

      this.printData(encoder.encode());
    };
  }

  async printComprovante(dados: Comprovante) {
    const printer = await this.storage.get('printer');
    const encoder = new EscPosEncoder();
    const img = new Image();
    img.src = '/assets/login/logo_patiosg_320.png';
    img.crossOrigin = 'Anonymous';

    // Format amount to currency (R$)
    const formattedAmount = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(dados.amount);

    img.onload = () => {
      encoder
        .initialize()
        .align('center')
        .image(img, 320, 80, 'atkinson', 256)
        .size('normal')
        .bold()
        .line('COMPROVANTE DE PAGAMENTO')
        .bold(false)
        .newline()
        .align('left')
        .line('================================================')
        .newline()
        .line(this.printLine('Data:', moment(dados.local_time).format('DD/MM/YYYY')))
        .line(this.printLine('Hora:', moment(dados.local_time).format('HH:mm')))
        .line(this.printLine('Transação:', dados.id))
        .line(this.printLine('NSU:', dados.transaction_code))
        .newline()
        .line('------------------------------------------------')
        .bold()
        .line(this.printLine('Valor Total:', formattedAmount))
        .bold(false)
        .line('------------------------------------------------')
        .newline()
        .line('FORMA DE PAGAMENTO')
        .line(this.printLine('Tipo:', dados.process_as))
        .line(this.printLine('Cartão:', `**** **** **** ${dados.card.last_4_digits}`))
        .line(this.printLine('Parcelas:', dados.installments_count.toString()))
        .newline()
        .line('PRODUTOS')
        .newline();

      // Print each product with its details
      dados.products.forEach(product => {
        encoder
          .line(`${product.name}`)
          .line(`${product.quantity}x R$ ${product.total_price / product.quantity} = R$ ${product.total_price}`)
          .newline();
      });

      encoder
        .line('================================================')
        .newline()
        .align('center')
        .line('* GUARDE SEU COMPROVANTE *')
        .newline()
        .newline()
        .newline();
    }

    if (printer && printer.usarGuilhotina) {
      encoder.cut('partial');
    }

    this.printData(encoder.encode());
  }

  async printGuiaLiberacao(dados: any) {
    const printer = await this.storage.get('printer');
    const encoder = new EscPosEncoder();

    encoder
      .initialize()
      .align('left')
      .size('normal')
      .newline()
      .width(1)
      .height(1)
      .line(Util.removeAccent(dados.clienteNome))
      .line(Util.removeAccent(dados.clienteEndereco))
      .line('______________________________________________')
      .newline()
      .align('center')
      .width(2)
      .height(2)
      .bold()
      .line('GUIA DE AUTORIZACAO PARA RETIRADA DE VEICULO')
      .newline()
      .bold(false)
      .width(1)
      .height(1)
      .align('left')
      .newline()
      .line('PROCESSO: ' + dados.numeroProcesso)
      .line('TIPO DE PROCESSO: ' + Util.removeAccent(dados.dadosTipoProcesso))
      .line('REBOQUE: ' + dados.dadosReboque)
      .line('DATA/HORA DE ENTRADA: ' + dados.dadosDataEntrada + ' ' + dados.dadosHoraEntrada)
      .line('PERMANENCIA: ' + dados.dadosPermanencia)
      .line('AUTORIZADO A SAIDA EM: ' + dados.dadosAutorizadaRetiradaVeiculoEm)
      .newline()
      .bold(true)
      .line('DADOS DA LIBERACAO')
      .line('FORMA DE LIBERACAO: ' + dados.atendimentoFormaLiberacao.toUpperCase())
      .bold(false)
      .line('NOME: ' + Util.removeAccent(dados.atendimentoFormaLiberacaoNome))
      .line('CNH: ' + dados.atendimentoFormaLiberacaoCNH)
      .line(dados.labelAtendimentoFormaLiberacaoCpfPlaca + dados.atendimentoFormaLiberacaoCpfPlaca)
      .newline()
      .bold(true)
      .line('DADOS DA VEICULO')
      .bold(false)
      .line('MARCA/MODELO: ' + dados.veiculoMarcaModelo)
      .line('PLACA: ' + dados.veiculoPlaca)
      .line('RENAVAM: ' + dados.veiculoRenavam)
      .line('CHASSI: ' + dados.veiculoChassi)
      .line('COR: ' + dados.veiculoCor)
      .bold(true)
      .line('SETOR: ' + Util.removeAccent(dados.grvEstacionamentoSetor))
      .line('VAGA: ' + Util.removeAccent(dados.grvEstacionamentoNumeroVaga))
      .line('CHAVE NO CLAVICULARIO: ' + Util.removeAccent(dados.grvNumeroChave))
      .bold(false)
      .newline()
      .newline()
      .line(Util.removeAccent(dados.textoApresentacao))
      .newline()
      .align('center')
      .qrcode(dados.qrCodeString)
      .newline()
      .line('______________________________________________')
      .newline()
      .newline()
      .line('DECLARACAO DE RETIRADA DE VEICULO')
      .newline()
      .newline()
      .align('left')
      .line(Util.removeAccent(dados.textoDeclaracaoRetirada1))
      .newline()
      .line(Util.removeAccent(dados.textoDeclaracaoRetirada2))
      .newline()
      .newline()
      .bold(true)
      .line('LACRES')
      .bold(false)
      .line(dados.listagemLacre.join(', '))
      .newline()
      .newline()
      .align('center')
      .line('______________________________________________')
      .line(Util.removeAccent(dados.proprietarioProcurador.replace('Proprietário/Procurador:', '')))
      .line(dados.proprietarioCpf)
      .newline()
      .newline()
      .line('______________________________________________')
      .line('Responsavel pela entrega (por extenso).')
      .newline()
      .newline()
      .newline()
      .newline()
      .newline()
      .newline()
      .newline()
      .newline()
      .newline();

    if (printer && printer.usarGuilhotina) {
      encoder.cut('partial');
    }
    this.printData(encoder.encode());
  }

  async toast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }

  printLine(field: string, value: string) {
    const base = field + value;
    const len = base.length;
    let result = base;
    if (len < 33) {
      let count = 33 - len;
      const a = new Array(count);
      const dots = a.join('.');
      result = field + dots + value;
    }

    return result;
  }
}
