import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DocumentUploadRoutingModule } from './document-upload-routing.module';
import { DocumentUploadPage } from './document-upload.page';
import { CameraService } from 'src/app/services/camera/camera.service';
import { ToolbarModule } from '../toolbar/toolbar.module';

@NgModule({
  declarations: [DocumentUploadPage],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    DocumentUploadRoutingModule,
    ToolbarModule,
  ],
  providers: [CameraService],
})
export class DocumentUploadModule {}
