import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { Store } from '@ngxs/store';
import { AuthState } from './state/auth/auth.state';
import { AtendimentoService } from './services/atendimento/atendimento.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  options;
  constructor(
    private store: Store,
    private atendimentoService: AtendimentoService,
    private router: Router,
    private menu: MenuController
  ) {
    this.initializeApp();
  }
  ngOnInit(): void {
    this.atendimentoService.emitInformations.subscribe((resp) => {
      this.options = this.store.selectSnapshot(AuthState.all);
    });
  }

  initializeApp() {
    /* To make sure we provide the fastest app loading experience
       for our users, hide the splash screen automatically
       when the app is ready to be used:

        https://capacitor.ionicframework.com/docs/apis/splash-screen#hiding-the-splash-screen
    */
    SplashScreen.hide();
  }
  logout() {
    this.menu.close();
    this.router.navigate(['/login']);
  }
}
