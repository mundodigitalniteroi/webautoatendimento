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
  ) {}

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

  // formatCurrency(value) {
  //   return this.decimalPipe.transform(value, '1.2-2', 'pt-br');
  // }
}
