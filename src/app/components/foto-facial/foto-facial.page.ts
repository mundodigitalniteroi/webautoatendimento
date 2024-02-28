import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { AtendimentoService } from 'src/app/services/atendimento/atendimento.service';
import { Util } from 'src/app/services/util/util.service';
import { SetFotoId } from 'src/app/state/atendimento/atendimento.action';
import { AtendimentoState } from 'src/app/state/atendimento/atendimento.state';

@Component({
  selector: 'app-facial-recognition',
  templateUrl: './foto-facial.page.html',
  styleUrls: ['./foto-facial.page.scss'],
})
export class FotoFacialPage implements OnInit {
  fotos = [];
  options;
  loading = false;
  foto;

  constructor(
    private store: Store,
    private router: Router,
    private atendimentoService: AtendimentoService,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    this.options = this.store.selectSnapshot(AtendimentoState.all);
    this.foto = `data:image/jpeg;base64,${this.options.fotoFacial.base64}`;
  }

  fotoUpload() {
    this.loading = true;

    const base64 = this.options.fotoFacial.base64;
    const file = Util.convertBase64ToFile(base64);

    this.atendimentoService.uploadArquivo(file, 'PUBLICO').subscribe(
      (resp: any) => {
        const fotoId = resp.data.arquivoId;
        this.store.dispatch(new SetFotoId(fotoId));
        this.router.navigate(['/document-upload']);
        this.loading = false;
      },
      (e) => {
        this.loading = false;
        if (e.error && e.error.data.message) {
          this.toast(e.error.data.message);
          return false;
        }

        this.toast('Erro ao enviar foto, tente novamente');
      }
    );
  }

  async toast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }

  tryAgain() {
    this.router.navigate(['/facial-recognition']);
  }
}
