import { Component, OnInit } from '@angular/core';
import { PrintService } from '../../services/print/print.service';
import { Storage } from '@ionic/storage';
import { AlertController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-print',
  templateUrl: 'print.page.html',
  styleUrls: ['print.page.scss'],
})
export class PrintPage implements OnInit {
  bluetoothList: any = [];
  selectedPrinter: any;
  result;
  form: FormGroup;
  usarGuilhotina: false;
  constructor(
    private print: PrintService,
    private storage: Storage,
    private toastController: ToastController,
    private alert: AlertController,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      printer: [''],
    });
  }

  ionViewWillEnter() {
    this.storage.get('printer').then((p) => {
      console.log(p);
      this.form.controls.printer.setValue(p.printer);
      this.selectedPrinter = p.printer;
      this.usarGuilhotina = p.usarGuilhotina;
    });
    this.print
      .hasPermission()
      .then(() => {
        this.listPrinter(null);
      })
      .catch(() => {
        this.toast('Não foi possivel listar os dispositivos');
      });
  }

  //This will list all of your bluetooth devices
  listPrinter(event) {
    this.print.searchBluetoothPrinter().then((resp) => {
      this.bluetoothList = resp;
      if (event) {
        event.target.complete();
      }
    });
  }

  //This will store selected bluetooth device mac address
  selectPrinter(macAddress) {
    //Selected printer macAddress stored here
    this.selectedPrinter = macAddress;
  }

  //This will print
  savePrint() {
    const printer = {
      printer: this.selectedPrinter,
      usarGuilhotina: this.usarGuilhotina,
    };
    this.storage.set('printer', printer);
    this.presentAlert('Impressora Configurada!');
  }

  async presentAlert(message) {
    const alert = await this.alert.create({
      header: 'Sucesso',
      message: `${message}`,
      buttons: ['OK'],
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
}
