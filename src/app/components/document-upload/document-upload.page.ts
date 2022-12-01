import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.page.html',
  styleUrls: ['./document-upload.page.scss']
})
export class DocumentUploadPage implements OnInit {
  line = false;
  checkCrlv = false;
  checkIpva = false;
  checkMulta = false;
  checkLicen = false;
  checkComp = false;
  constructor() { }

  ngOnInit(): void {
  }

  takePhoto(){
    this.checkCrlv = true;
    this.checkIpva = true;
    this.checkMulta = true;
    this.checkLicen = true;
    this.checkComp = true;
  }
}
