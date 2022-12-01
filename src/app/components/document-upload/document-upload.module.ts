import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DocumentUploadRoutingModule } from './document-upload-routing.module';
import { DocumentUploadPage } from './document-upload.page';




@NgModule({
  declarations: [DocumentUploadPage],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    DocumentUploadRoutingModule
  ]
})
export class DocumentUploadModule { }
