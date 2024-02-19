import { Component, OnInit } from '@angular/core';
import {
  CameraPreview,
  CameraPreviewOptions,
  CameraPreviewPictureOptions,
} from '@capacitor-community/camera-preview';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.page.html',
  styleUrls: ['./preview.page.scss'],
})
export class PreviewPage implements OnInit {
  image = null;
  cameraActive = false;
  title;
  constructor(private modal: ModalController) {}

  ngOnInit() {
    this.launchCamera();
  }

  launchCamera() {
    const cameraPreviewOptions: CameraPreviewOptions = {
      position: 'rear', // front or rear
      parent: 'preview', // the id on the ion-content
      className: '',
      width: window.screen.width, //width of the camera display
      height: window.screen.height - 300, //height of the camera
      toBack: false,
      y: 100,
      lockAndroidOrientation: true,
      disableExifHeaderStripping: false,
      enableZoom: true,
    };
    CameraPreview.start(cameraPreviewOptions);
    this.cameraActive = true;
  }

  async takePicture() {
    const cameraPreviewPictureOptions: CameraPreviewPictureOptions = {
      quality: 85,
    };
    const result = await CameraPreview.capture(cameraPreviewPictureOptions);
    this.image = `data:image/jpeg;base64,${result.value}`;
    this.stopCamera();
  }

  async stopCamera() {
    await CameraPreview.stop();
    this.modal.dismiss(this.image);
  }
}
