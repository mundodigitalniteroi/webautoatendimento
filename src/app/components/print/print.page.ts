import { Component, OnInit } from '@angular/core';
import { PrintService } from '../../services/print/print.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
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

  constructor(
    private print: PrintService,
    private storage: Storage,
    private toastController: ToastController,
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
      this.form.controls.printer.setValue(p);
      this.selectedPrinter = p;
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
    this.storage.set('printer', this.selectedPrinter);
    this.toast('Impressora Configurada!');
  }

  async toast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }
}
