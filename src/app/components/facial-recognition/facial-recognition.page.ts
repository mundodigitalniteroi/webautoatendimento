import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AtendimentoService } from 'src/app/services/atendimento/atendimento.service';
import { CameraService } from 'src/app/services/camera/camera.service';
import { SetFacialRocgnition } from 'src/app/state/atendimento/atendimento.action';
import { CameraPreview, CameraPreviewOptions, CameraPreviewPictureOptions } from '@capacitor-community/camera-preview';

@Component({
  selector: 'app-facial-recognition',
  templateUrl: './facial-recognition.page.html',
  styleUrls: ['./facial-recognition.page.scss'],
})
export class FacialRecognitionPage implements OnInit, OnDestroy {
  fotos = [];
  constructor(private cameraService: CameraService, private store: Store, private router: Router) {}

  ngOnInit(): void {}

  ionViewWillEnter() {
    this.launchCamera();
  }

  // newPhoto() {
  //   this.cameraService.requestPermission().then((item) => {
  //     if (item.camera == 'granted') {
  //       this.cameraService.getFrontPhoto().then((foto) => {
  //         const fotoModel = {
  //           tipo: 'image/jpeg',
  //           base64: foto.dataUrl,
  //           tamanho: foto.exif.ImageLength,
  //         };
  //         this.fotos.push(fotoModel);
  //         this.store.dispatch(new SetFacialRocgnition(this.fotos[0]));
  //         this.router.navigate(['/foto-facial']);
  //       });
  //     }
  //   });
  //   // this.router.navigate(['/document-upload'])
  // }

  launchCamera() {
    const cameraPreviewOptions: CameraPreviewOptions = {
      position: 'front', // front or rear
      parent: 'preview', // the id on the ion-content
      className: '',
      width: 377, //width of the camera display
      height: 503, //height of the camera
      y: 236,
      x: 155,
      toBack: false,
      lockAndroidOrientation: true,
      disableExifHeaderStripping: false,
    };
    CameraPreview.start(cameraPreviewOptions);
    //this.cameraActive = true;
  }

  async takePicture() {
    const cameraPreviewPictureOptions: CameraPreviewPictureOptions = {
      quality: 85,
    };
    const result = await CameraPreview.capture(cameraPreviewPictureOptions);
    const fotoModel = {
      tipo: 'image/jpeg',
      base64: result.value,
      tamanho: 0,
    };
    this.store.dispatch(new SetFacialRocgnition(fotoModel));
    this.router.navigate(['/foto-facial']);
    this.stopCamera();
  }

  async stopCamera() {
    await CameraPreview.stop();
  }

  voltar() {
    this.stopCamera();
    this.router.navigate(['/address']);
  }

  ngOnDestroy(): void {
    this.stopCamera();
  }
}
