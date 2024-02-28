import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DocumentScanner, ResponseType } from 'capacitor-document-scanner';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.page.html',
  styleUrls: ['./preview.page.scss'],
})
export class PreviewPage implements OnInit {
  image = null;
  title;
  change = false;
  tipoDocumentoId;
  constructor(private modal: ModalController) {}

  ngOnInit() {
    console.log(this.image);
    if (!this.image) {
      this.launchCamera();
    }
  }

  async launchCamera() {
    const { scannedImages } = await DocumentScanner.scanDocument({
      maxNumDocuments: 1,
      responseType: ResponseType.Base64,
    });
    this.change = true;
    this.image = scannedImages[0];
  }

  async stopCamera() {
    this.modal.dismiss({ base64: this.image, change: this.change, tipoDocumentoId: this.tipoDocumentoId });
  }
}
