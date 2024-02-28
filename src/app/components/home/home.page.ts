import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { AuthState } from 'src/app/state/auth/auth.state';
import { AtendimentoService } from '../../services/atendimento/atendimento.service';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  options;
  image;
  permissions = [this.diagnostic.permission.CAMERA, 'READ_MEDIA_IMAGES'];

  //scanOptions: DocumentScannerOptions;
  constructor(
    private router: Router,
    private store: Store,
    private menu: MenuController,
    private atendimentoService: AtendimentoService,
    private modal: ModalController,
    //private scan: DocumentScanner,
    private diagnostic: Diagnostic
  ) {
    this.hasPermission();
  }

  ngOnInit(): void {
    this.options = this.store.selectSnapshot(AuthState.all);
  }
  goPublicSearch() {
    this.router.navigate(['/term-acception']);
  }
  goQuery() {
    this.router.navigate(['/query']);
  }
  fecharMenu() {
    this.menu.close();
  }
  openMenu() {
    this.atendimentoService.emitInformations.next(true);
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
}
