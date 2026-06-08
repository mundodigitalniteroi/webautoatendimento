import { Injectable } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { ToastController, AlertController } from '@ionic/angular';
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
import { ConsultaState } from 'src/app/state/consulta/consulta.state';
import { PlanoParcelamento } from 'src/app/interfaces/consulta.interface';
import { __await } from 'tslib';

@Injectable({
  providedIn: 'root',
})
export class PrintService {
  private unsubscribeAll$ = new Subject();
  optionsConsulta;
  permissions = ['BLUETOOTH_CONNECT', 'BLUETOOTH_SCAN'];
  constructor(
    public btSerial: BluetoothSerial,
    private toastController: ToastController,
    private alertController: AlertController,
    private storage: Storage,
    private diagnostic: Diagnostic,
    private store: Store
  ) {
    this.optionsConsulta = this.store.selectSnapshot(ConsultaState.all);

  }

  async searchBluetoothPrinter() {
    try {
      return await this.btSerial.list()
    } catch (error) {
      await this.toast('Erro ao buscar bluetooth disponível.');
      return null;
    }
  }

  async connectToBluetoothPrinter(macAddress: string) {
    try {
      // Verifica se o bluetooth está ligado
      const isEnabled = await this.btSerial.isEnabled();
      if (!isEnabled) {
        await this.showBluetoothDisabledAlert();
        return;
      }

      // busca se tem alguma impressora pareada
      const devices = await this.searchBluetoothPrinter();

      if (!devices || devices.length === 0) {
        await this.toast('Nenhum dispositivo Bluetooth pareado encontrado.');
        return;
      }

      // verifica se a impressora configurada existe na lista
      const printer = devices.find(
        (device) => device.address === macAddress
      );

      if (!printer) {
        await this.toast('Impressora não encontrada entre os dispositivos pareados.');
        return;
      }

      return new Promise((resolve, reject) => {
        this.btSerial.connect(macAddress).subscribe(
          (success) => {
            console.log('Bluetooth conectado');
            resolve(true);
          },
          (error) => {
            console.error('Erro conexão bluetooth', error);
            reject(error);
          }
        );
      });
    } catch (error) {
      await this.showBluetoothDisabledAlert();
      return;
    }
  }

  async disconnectBluetoothPrinter() {
    try {
      await this.btSerial.disconnect();
    } catch (error) {
      await this.toast('Erro ao desconectar');
    }
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

  async printData(data: any) {
    const p = await this.storage.get('printer').catch(() => null);

    if (!p?.printer) {
      await this.toast('Nenhuma impressora configurada!');
      return;
    }

    try {
      await this.connectToBluetoothPrinter(p.printer);

      const chunkSize = 4096;
      const dataArray = new Uint8Array(data);

      for (let i = 0; i < dataArray.length; i += chunkSize) {
        const chunk = dataArray.slice(i, i + chunkSize);
        await this.btSerial.write(chunk);
        await new Promise(resolve => setTimeout(resolve, 250));
      }

      await new Promise(resolve => setTimeout(resolve, 500));
      await this.btSerial.write(new Uint8Array([0x0A, 0x0A, 0x0A, 0x0A]));
      await this.disconnectBluetoothPrinter();
    } catch (err) {
      await this.toast('Erro ao imprimir o comprovante');
      await this.disconnectBluetoothPrinter();
    }
  }

  async printProtocolo(protocolo) {
    const printer = await this.storage.get('printer').catch(() => null);

    if (!printer) {
      await this.toast('Nenhuma impressora configurada');
      return;
    }

    const encoder = new EscPosEncoder();
    const img = new Image();
    img.src = '/assets/login/logo_translog.png';
    img.crossOrigin = 'Anonymous';

    img.onload = async () => {
      try {
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

        await this.printData(encoder.encode());
      } catch (err) {
        await this.toast('Erro ao imprimir o protocolo');
      }
    };

    img.onerror = async () => {
      await this.toast('Erro ao carregar imagem do protocolo');
    };
  }

  async printComprovante(dados: Comprovante) {
    const printer = await this.storage.get('printer');
    const encoder = new EscPosEncoder();
    const img = new Image();
    img.src = '/assets/login/logo_translog.png';
    img.crossOrigin = 'Anonymous';
    const parcelaSelecionada: PlanoParcelamento = this.optionsConsulta.informacaoParcelaSelecionada;

    // Retorna uma Promise para garantir que a imagem seja carregada
    return new Promise((resolve, reject) => {
      img.onload = async () => {
        try {
          encoder
            .initialize()
            .align('center')
            .image(img, 200, 80, 'bayer', 64) // Reduzido a profundidade de cor para 128
            .size('normal')
            .bold()
            .line('COMPROVANTE DE PAGAMENTO')
            .bold(false)
            .newline()
            .align('left')
            .line(this.printLine('Data:', moment(dados.local_time).format('DD/MM/YYYY')))
            .line(this.printLine('Hora:', moment(dados.local_time).format('HH:mm')))
            .line(this.printLine('Cod. Autorizacao:', dados.auth_code))
            .bold(false)
            .line(this.printLine('Tipo:', 'credito'))
            .line(this.printLine('Cartao:', dados.card.last_4_digits.toString()))
            .line(this.printLine('Parcelas:', dados.installments_count.toString()))
            .line(this.printLine('Valor Mensal:', 'R$ ' + parcelaSelecionada.valorMensal))
            .line(this.printLine('Valor Total:', 'R$ ' + dados.amount))

          if (printer && printer.usarGuilhotina) {
            encoder.cut('partial');
          }

          // Gera os dados da impressão e envia
          const data = encoder.encode();
          await this.printData(data);
          resolve(true);
        } catch (error) {
          console.error('Erro na impressão:', error);
          reject(error);
        }
      };

      img.onerror = (error) => {
        console.error('Erro ao carregar imagem:', error);
        reject(error);
      };
    });
  }

  async printGuiaLiberacao(dados: any) {
    const printer = await this.storage.get('printer');

    if (!printer) {
      this.toast('Nenhuma impressora configurada');
      return;
    }


    const encoder = new EscPosEncoder();
    try {
      
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

      await this.printData(encoder.encode());
    } catch (err) {
      this.toast('Erro ao imprimir guia de autorização');
    }
  }

  async showBluetoothDisabledAlert() {
    const alert = await this.alertController.create({
      header: 'Bluetooth desligado',
      message:
        'Para imprimir a guia de liberação é necessário ativar o Bluetooth.',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Abrir Configurações',
          handler: () => {
            this.diagnostic.switchToBluetoothSettings();
          }
        }
      ]
    });

    await alert.present();
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