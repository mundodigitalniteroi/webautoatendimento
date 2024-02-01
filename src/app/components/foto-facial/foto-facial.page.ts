import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AtendimentoService } from 'src/app/services/atendimento/atendimento.service';
import { CameraService } from 'src/app/services/camera/camera.service';
import { SetFacialRocgnition } from 'src/app/state/registro/registro.action';
import { RegistroState } from 'src/app/state/registro/registro.state';

@Component({
  selector: 'app-facial-recognition',
  templateUrl: './foto-facial.page.html',
  styleUrls: ['./foto-facial.page.scss']
})
export class FotoFacialPage implements OnInit {
  fotos = [];
  options;
  
  constructor(
    private cameraService: CameraService,
    private store: Store,
    private router: Router,
    
    ) { }

  ngOnInit(): void {
    this.options = this.store.selectSnapshot(RegistroState.all);
    console.log(this.options)
  }


  documentUpload() {
    this.router.navigate(['/document-upload'])
  }
  tryAgain(){
    this.router.navigate(['/facial-recognition'])
  }
}
