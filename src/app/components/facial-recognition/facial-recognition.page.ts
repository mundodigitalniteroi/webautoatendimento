import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AtendimentoService } from 'src/app/services/atendimento/atendimento.service';
import { CameraService } from 'src/app/services/camera/camera.service';
import { SetFacialRocgnition } from 'src/app/state/registro/registro.action';

@Component({
  selector: 'app-facial-recognition',
  templateUrl: './facial-recognition.page.html',
  styleUrls: ['./facial-recognition.page.scss']
})
export class FacialRecognitionPage implements OnInit {
  fotos = [];
  constructor(
    private cameraService: CameraService,
    private store: Store,
    private router: Router,
    
    ) { }

  ngOnInit(): void {
   
  }


  newPhoto() {
    this.cameraService.requestPermission().then(item =>{
      if(item.camera == "granted"){
        this.cameraService.getFrontPhoto()
        .then(foto => {
          const fotoModel = {
            tipo: 'image/jpeg',
            base64: foto.dataUrl,
            tamanho:foto.exif.ImageLength,
          };
          this.fotos.push(fotoModel);
          // console.log(this.fotos)
          this.store.dispatch(new SetFacialRocgnition(this.fotos[0]));
          this.router.navigate(['/foto-facial'])
        });
      }
    })
    // this.router.navigate(['/document-upload'])
  }
}
