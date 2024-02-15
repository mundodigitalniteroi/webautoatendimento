import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AtendimentoService } from 'src/app/services/atendimento/atendimento.service';
import { CameraService } from 'src/app/services/camera/camera.service';
import { SetFacialRocgnition } from 'src/app/state/atendimento/atendimento.action';
import { AtendimentoState } from 'src/app/state/atendimento/atendimento.state';

@Component({
  selector: 'app-facial-recognition',
  templateUrl: './foto-facial.page.html',
  styleUrls: ['./foto-facial.page.scss'],
})
export class FotoFacialPage implements OnInit {
  fotos = [];
  options;

  constructor(
    private cameraService: CameraService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.options = this.store.selectSnapshot(AtendimentoState.all);
  }

  documentUpload() {
    this.router.navigate(['/document-upload']);
  }

  tryAgain() {
    this.router.navigate(['/facial-recognition']);
  }
}
