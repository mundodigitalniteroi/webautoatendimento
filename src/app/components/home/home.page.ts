import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { AuthState } from 'src/app/state/auth/auth.state';
import { AtendimentoService } from '../../services/atendimento/atendimento.service';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { SumupIntegracaoService } from 'src/app/services/sumup-integracao/sumup-integracao.service';
import { App } from '@capacitor/app';
import { ConsultaDebitoService } from 'src/app/services/consulta-debito/consulta-debito.service';

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
  authCode: string | null = null;
  modalPairingCode: boolean = false;
  pairingCode: string = '';

  //scanOptions: DocumentScannerOptions;
  constructor(
    private router: Router,
    private store: Store,
    private menu: MenuController,
    private atendimentoService: AtendimentoService,
    private consultaDebitoService: ConsultaDebitoService,
    private diagnostic: Diagnostic,
    private changeDetectorRef: ChangeDetectorRef,
    private sumupIntegracaoService: SumupIntegracaoService
  ) {
    this.hasPermission();
  }

  ngOnInit() { 

    App.addListener('appUrlOpen', (event) => {
      const url = new URL(event.url);
      if (url.host === 'callback' && url.protocol === 'sumupmobile:') {
        this.authCode = url.searchParams.get('code');
        const responseToken = this.sumupIntegracaoService.createToken({ grant_type: 'authorization_code', code: this.authCode })
        localStorage.setItem('authModel', JSON.stringify(responseToken));
        this.router.navigate(['/home']);
        this.login();
      }
    })
    this.options = this.store.selectSnapshot(AuthState.all);
    this.login();
    if (!localStorage.getItem('reader_id') || localStorage.getItem('reader_id') === undefined) {
      this.modalPairingCode = true;
    }
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

  async login() {
    try {
      // Se authModel não existe, inicia o fluxo de autorização
      if (!localStorage.getItem('authModel')) {
        await this.sumupIntegracaoService.authorize();
      }

      this.consultaDebitoService.loginWebziPay().subscribe(
        token => {
          localStorage.setItem('authTokenParcelas', token);
          // Use o token aqui
        },
        error => {
          console.error('Erro ao fazer login:', error);
        }
      );

    } catch (error) {
      console.error('Erro no login:', error);
    }
  }

  async confirmPairingCode() {
    if (this.pairingCode) {
      const responseReader = await this.sumupIntegracaoService.createReader({ pairing_code: this.pairingCode.toUpperCase() });
      localStorage.setItem('reader_id', responseReader.id);
      this.modalPairingCode = false; // Fecha o modal
      this.changeDetectorRef.detectChanges();
    }
  }

  goConfirmation() {
    this.router.navigate(['/payment-confirmed']);
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
