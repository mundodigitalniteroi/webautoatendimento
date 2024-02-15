import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { AuthState } from 'src/app/state/auth/auth.state';
import { AtendimentoService } from '../../services/atendimento/atendimento.service';
import { PreviewPage } from '../preview/preview.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  options;
  image;
  constructor(
    private router: Router,
    private store: Store,
    private menu: MenuController,
    private atendimentoService: AtendimentoService,
    private modal: ModalController
  ) {}

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
}
