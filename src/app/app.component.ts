import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { Store } from '@ngxs/store';
import { AuthState } from './state/auth/auth.state';
import { Router } from '@angular/router';
import { AlertController, MenuController, Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { App } from '@capacitor/app';
import { SumupIntegracaoService } from 'src/app/services/sumup-integracao/sumup-integracao.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  options;
  constructor(
    private store: Store,
    private router: Router,
    private menu: MenuController,
    private sumupIntegracaoService:SumupIntegracaoService,
    private platform: Platform,
    private _location: Location,
    public alertController: AlertController
  ) {
    this.initializeApp();
    this.platform.backButton.subscribeWithPriority(-1, (processNextHandler) => {
      if (this._location.isCurrentPathEqualTo('/home')) {
        this.showExitConfirm();
        processNextHandler();
        return;
      } else {
        return;
        //this._location.back();
      }
    });
  }
  ngOnInit(): void {
    this.store.select(AuthState.all).subscribe((state) => {
      this.options = state;
    });
  }

  initializeApp() {
    SplashScreen.hide();
  }
  logout() {
    this.menu.close();
    this.router.navigate(['/login']);
  }

  print() {
    this.menu.close();
    this.router.navigate(['/print']);
  }

  async desconnectReader(){
    if(localStorage.getItem("reader_id")){
      const response = await this.sumupIntegracaoService.removeReader(localStorage.getItem("reader_id"))
      this.alertController.create({
        header:"Sucesso",
        message:response,
        backdropDismiss:false
      })
      .then((alert) => {
        alert.present();
      });
    }
    else{
      this.alertController.create({
        header:"Erro",
        message:"O leitor ja foi removido!",
        backdropDismiss:false
      })
      .then((alert) => {
        alert.present();
      });
    }
  }

  showExitConfirm() {
    this.alertController
      .create({
        header: 'Atenção',
        message: 'Deseja fechar o app?',
        backdropDismiss: false,
        buttons: [
          {
            text: 'Não',
            role: 'cancel',
          },
          {
            text: 'Sim',
            handler: () => {
              App.exitApp();
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }
}
