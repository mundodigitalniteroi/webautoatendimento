import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { AuthState } from 'src/app/state/auth/auth.state';
import { AtendimentoService } from '../../services/atendimento/atendimento.service';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { SumUp } from '@awesome-cordova-plugins/sum-up/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  options;
  image;
  permissions = [this.diagnostic.permission.CAMERA, 'READ_MEDIA_IMAGES'];
  public sumupResult: any = {};
  private access_token: string = 'at_classic_X0IvZCeAXlJh1zwzcZ6rIpI7EvMCCJ6iVdQzoU1iir7I6bl20MBDY';
  affiliateKey: string = 'sup_afk_rvvWPzlqPXnfK1TLliCxWNSQxSrMVV8j';
  private refresh_token: string = 'rt_classic_s3e1mZCzmk1iPnOaz4Rv0mV5A9ZXMuugYsov3yyYuh992HnlVOn4s';

  //scanOptions: DocumentScannerOptions;
  constructor(
    private router: Router,
    private store: Store,
    private menu: MenuController,
    private atendimentoService: AtendimentoService,
    private diagnostic: Diagnostic,
    private sumUp: SumUp
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

  async login(): Promise<void> {
    try {
      this.sumupResult = await this.sumUp.login({ accessToken: '', affiliateKey: this.affiliateKey });
      console.log('sumupResult', this.sumupResult);
    } catch (e) {
      this.sumupResult = e;
    }
  }

  async prepare(): Promise<void> {
    try {
      this.sumupResult = await this.sumUp.prepare();
      console.log('sumupResult', this.sumupResult);
    } catch (e) {
      this.sumupResult = e;
    }
  }

  async setup(): Promise<void> {
    try {
      this.sumupResult = await this.sumUp.prepare();
      console.log('sumupResult', this.sumupResult);
    } catch (e) {
      console.log('sumupResultError', this.sumupResult);
      this.sumupResult = e;
    }
  }



  async settings(): Promise<void> {
    try {
      this.sumupResult = await this.sumUp.getSettings();
      console.log('sumupResult', this.sumupResult);
    } catch (e) {
      this.sumupResult = e;
    }
  }

  async pay(): Promise<void> {
    try {
      this.sumupResult = await this.sumUp.pay(10.01, 'Title', 'BRL');
      console.log('sumupResult', this.sumupResult);
    } catch (e) {
      console.log('sumupResult', this.sumupResult);
      this.sumupResult = e;
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
}
